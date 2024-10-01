const sqlite3 = require('sqlite3')
require("dotenv").config()
const dbUrl=process.env.DATABASE_URL
const db=new sqlite3.Database(dbUrl)
class DBHandler {
    getContact(){
        const query="SELECT * FROM contact"
        return new Promise((resolve,reject)=>{
            db.all(query,[],(err,rows)=>{
                if(err){
                    console.error('Error fetching data:', err.message);
                    reject(err.message);
                }
                else {
                    //console.log(rows)
                    resolve(rows)

                }
            })
        })
    
    }
    insertContactInformation(first_name,last_name,message){
        console.log([first_name,last_name,message],"In side database.js")
    const query=`INSERT INTO contact_us (first_name, last_name, message) 
    VALUES (?,?,?);`
    return new Promise((resolve,reject)=>{   
        db.run(query,[first_name,last_name,message],(err)=>{
            if(err){
                reject(err);
            }else{
                resolve(this.lastID)
            }
        })    
    })
    
    }
    getEvents(){
        const query="SELECT * FROM event LIMIT 3"
        return new Promise((resolve,reject)=>{
            db.all(query,[],(err,rows)=>{
                if(err){
                    console.error('Error fetching event data:', err.message);
                    reject(err.message);
                }
                else {
                    console.log(rows)
                    resolve(rows)

                }
            })
        })   
    }
    getAboutUs(){
        const query="SELECT * FROM about_us"
        return new Promise((resolve,reject)=>{
            db.all(query,[],(err,rows)=>{
                if(err){
                    console.error('Error fetching about us data:', err.message);
                    reject(err.message);
                }
                else {
                    //console.log(rows)
                    resolve(rows)

                }
            })
        })
    
    }
}
module.exports=DBHandler