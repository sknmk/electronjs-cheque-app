import { Database } from "./Database"
import moment from "moment"
import * as fs from 'fs';
import * as path from 'path';

export class Cheque {

    constructor() {
        let dbObj = new Database();
        this.db = dbObj.connect()
    }

    get(direction, limit) {
        limit = limit || null;
        let query = this.db.select("c.*", "ao.name as interlocutorName", "ai.name as authorName", this.db.raw("strftime('%d.%m.%Y', date(c.dueDate)) as formattedDueDate"))
            .from("cheques as c")
            .innerJoin("accounts as ao", "c.interlocutor", "ao.id")
            .innerJoin("accounts as ai", "c.author", "ai.id")
            .where("c.isDeleted", "0")
            .orderBy("c.dueDate")
        
        if (direction != "both") {
            query.where("type", direction)
        }

        if (limit != null) {
            query.limit(limit)
        }
        
        return query
    }

    save(params) {
        let targetFilePath = path.join(__dirname, "../../../client/static/img/" + Math.floor((Math.random() * 100) + 1) +  path.basename(params.originalImage));
        fs.copyFile(params.originalImage, targetFilePath, (err) => {
           if (err) throw err;
        });

        params.originalImage = targetFilePath

        return this.db("cheques").insert(params);
    }

    static setParams(params) {
        return {
            interlocutor: params.interlocutor || "",
            type: params.type && params.type.trim() || "",
            transactionDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            referenceNumber: params.referenceNumber && params.referenceNumber.trim() || "",
            author: params.author || "",
            amount: params.amount && params.amount.trim() || "",
            currency: params.currency && params.currency.trim() || "",
            location: params.location && params.location.trim() || "",
            bank: params.bank && params.bank.trim() || "",
            status: "0",
            insertDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            accountNumber: params.accountNumber && params.accountNumber.trim() || "",
            bankBranch: params.bankBranch && params.bankBranch.trim() || "",
            dueDate: moment(params.dueDate, "DD.MM.YYYY").format("YYYY-MM-DD") || "",
            isDeleted: "0",
            originalImage: params.originalImage || "",
        }
    }

    static validate(params) {
        let exceptions = {};
        let invalidValue = "invalid-value";

        if (isNaN(params.interlocutor) || params.interlocutor.length < 1) {
            exceptions.interlocutor = invalidValue
        }

        if (isNaN(params.author) || params.author.length < 1) {
            exceptions.author = invalidValue
        }

        if (params.type.length != 8) {
            exceptions.type = invalidValue
        }

        if (params.referenceNumber.length > 50 || params.referenceNumber.length < 3 || params.referenceNumber.match("/^[a-z0-9]+$/i") === false) {
            exceptions.referenceNumber = invalidValue
        }

        if (params.accountNumber.length > 50 || params.accountNumber.length < 3 || params.accountNumber.match("/^[a-z0-9]+$/i") === false) {
            exceptions.accountNumber = invalidValue
        }

        if (isNaN(params.amount) || params.amount.length > 12 || params.amount.length < 1) {
            exceptions.amount = invalidValue
        }

        if (params.currency.length != 3) {
            exceptions.currency = invalidValue
        }

        if (params.location.length > 75 || params.location.length < 4) {
            exceptions.location = invalidValue
        }

        if (params.bank.length > 75 || params.bank.length < 4) {
            exceptions.bank = invalidValue
        }

        if (params.bankBranch.length > 75 || params.bankBranch.length < 4) {
            exceptions.bankBranch = invalidValue
        }

        if (moment(params.dueDate, "YYYY-MM-DD").isValid() !== true){
            exceptions.dueDate = invalidValue
        }

        return {exceptions}
    }

    getBalance()
    {
        return this.db.select("type")
            .sum("amount as amount")
            .from("cheques")
            .where("isDeleted", "0")
            .groupBy("type")
    }

    getReceivablesDebts(lookBy)
    {
        return this.db.select("a.name")
        .sum("amount as amount")
        .from("cheques as c")
        .leftJoin("accounts as a", "c." + lookBy, "a.id")
        .where({ isSystemOwner: "0", "c.isDeleted": "0" })
        .groupBy("c." + lookBy)
        .orderBy("amount", "desc")
        .limit(6)
    }

    delete(form) {       
        return this.db("cheques")
        .where("id", "=", form.chequeId)
        .update({ isDeleted: "1" })
    }

    mark(form) {
        return this.db("cheques")
        .where("id", "=", form.chequeId)
        .update({ status: form.status })
    }

}