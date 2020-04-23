import { Database } from "./Database"
import moment from "moment";

export class Accounts {

    constructor() {
        let dbObj = new Database();
        this.db = dbObj.connect()
    }

    get() {
        return this.db.select("a.*", this.db.raw("sum(ci.amount) as incomingAmount"), this.db.raw("sum(co.amount) as outgoingAmount"))
            .from("main.accounts as a")
            .leftJoin("cheques as ci", function () {
                this.on("ci.author", "=", "a.id").andOnVal("ci.isDeleted", "=", "0")
            })
            .leftJoin("cheques as co", function () {
                this.on("co.interlocutor", "=", "a.id").andOnVal("co.isDeleted", "=", "0")
            })
            .where({ "a.isDeleted": "0" })
            .groupBy("a.id")
            .orderBy("a.name")
    }

    save(params) {
        return this.db("accounts").insert(params);
    }

    delete(form) {       
        return this.db("accounts")
        .where("id", "=", form.accountId)
        .update({ isDeleted: "1" })
    }

    static setParams(params) {
        return {
            name: params.name && params.name.trim() || "",
            address: params.address && params.address.trim() || "",
            phone: params.phone && params.phone.trim() || "",
            email: params.email && params.email.trim() || "",
            isSystemOwner: params.isSystemOwner && params.isSystemOwner || "0",
            status: "1",
            insertDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            updateDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            isDeleted: "0"
        }
    }

    static validate(params) {
        let exceptions = {};
        let invalidValue = "invalid-value";

        if (params.address.length > 250 || params.address.length < 8) {
            exceptions.address = invalidValue
        }

        if (params.name.length > 80 || params.name.length < 4) {
            exceptions.name = invalidValue
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(params.email) === false)
        {
            exceptions.email = invalidValue
        }

        if (params.phone.length != 10 && isNaN(params.phone) === false) {
            exceptions.phone = invalidValue
        }

        return {exceptions}
    }
}