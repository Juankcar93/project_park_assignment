const sqlite3 = require('sqlite3')
const db=new sqlite3.Database('./database/park.db')
const query="SELECT * FROM contact"
class DBHandler {
    getContact(){
        db.all(query,[],(err,rows)=>{
            if(err){
                console.error('Error fetching data:', err.message);
            //callback(err, null);
            }
            else {
                //callback(null, rows); // Returning all rows
                console.log(rows)
                return rows
            }
        })
    }
}
module.exports=DBHandler