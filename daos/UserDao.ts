
import { User } from "@/redux/dummyUser";
import { VercelPoolClient, createClient } from "@vercel/postgres";

export class UserDao {

    signIn(user: User): { query: string, values: any[] } {
        
        const values = [user.email, user.email, user.name, user.name, '', this.getNowDate(), this.getNowDate()]
        const query = `INSERT INTO users ("id", "email", "firstName", "lastName", "password", "firstLogin", "lastLogin")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT ("id")
        DO UPDATE SET "lastLogin" = EXCLUDED."lastLogin";`
        return {query, values}
    }
    delete() {

    }
    edit() {

    }
    clientUserToDBuser() {

    }
    DBuserToClientUser() {
        
    }
    getNowDate(): Date {
        const currentDate = new Date();
        const options = { timeZone: 'Asia/Jerusalem' };
        return new Date(currentDate.toLocaleString('en-US', options));
    }
}