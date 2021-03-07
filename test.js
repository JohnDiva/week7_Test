const { urlencoded } = require("body-parser")
const express =require("express")
const app = express()
const path =require("path")

let db = ["Harry Potter", "Shrek", "Jack and Jill", "Mr Bean", "Mr Bones","Mispelled/other"]
let a = []
let b = []
let c = []
let d = []
let e = []
let others=[]
let array=[];

app.use(express.urlencoded({extended:false}))

app.use(express.static("./"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/test.html")
})

app.get("/saveBook", function (req,res){
    let count =0;
    for (let title of db){
        count +=1
        if (title == req.query.bookTitle){
            break;
        }
    }

    if (count == 1){
        a.push(db[0])
    }
    else if(count ==2){
        b.push(db[1])
    }
    else if(count ==3){
        c.push(db[2])
    }
    else if(count ==4){
        d.push(db[3])
    }
    else if(count==5){
        e.push(db[4])
    }
    else {
        others.push(req.query.bookTitle)
    }
            
    res.status(201).redirect("/")
})

app.get("/show", function(req,res){
    res.sendFile(__dirname + "/show.html")
})

app.get('/getFavourite', function(req, res){
    array.push(a, b, c , d, e, others)
    let add= 0           
    let n = array.length -1
    let reduce = function (func, data, init) {
    let cumulative = init
  
    for (let item of data) {
      cumulative = func(item,cumulative)  
      }
  
      return cumulative
      }
      let findFavour = function (item, val) {
          add +=1
          if( val.length >= item.length && add == n){
              if(val == others){
                  return "A new book NOT in the current Top Rated Books"
              }
             return val[0]
          }
         else if(val.length <= item.length && add ==n ) {
             if(item ==others){
                 return "A new book NOT in the current Top Rated Books"
             }
          return item[0]  
         } else if( val.length >= item.length){
             return val
         }
          else{
              return item
          } 
       }
      let init_val = array[0]
      let rest = array.splice(1, array.length)
      let favour = reduce( findFavour,rest,init_val)
      //console.log(favour)
      res.json(favour)

})
app.listen(9091)
console.log("listening on 9091")