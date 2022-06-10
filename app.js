var express    = require('express');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path       = require('path');
var XLSX       = require('xlsx');
var multer     = require('multer');

//multer storage------------------------
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '.')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

  var upload = multer({ storage: storage });

//connect to Demoexcel db in mongoose-------------------------
mongoose.connect('mongodb://localhost:27017/Demoexcel',{useNewUrlParser:true})
.then(()=>{console.log('connected to db')})
.catch((error)=>{console.log('error',error)});

//init app------------------------------
var app = express();

//set the template engine----------------
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));

//Model structure for Demoexcel db--------------------------
var excelSchema = new mongoose.Schema({
    name:String,
    type:String,
    breed:String,
    age: Number
});
var excelModel = mongoose.model('excelData',excelSchema);


//-------------------------------------------------------------------------------------------

//get api request to get all data present in database-------------------------------
app.get('/api/pet',upload.single('excel'),async(req,res)=>{
let pets=await excelModel.find({});
res.send(pets);
// console.log(pets);
})


//get api request to get pet with given petId if present in database-------------------------------
app.get('/api/pet/:petId',async (req,res)=>{
  const petId=req.params.petId;
  let pets=await excelModel.findById(petId);
  res.send(pets);
})


//post api request to post data to our database from excel file-----------------------------------
app.post('/api/pet',upload.single('excel'),(req,res)=>{
  var workbook =  XLSX.readFile("\pets.xlsx");
  workbook.SheetNames.forEach(x => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[x]);
    xlData.forEach(elements=>{
      const newDog=new excelModel({
        name:elements.Name,
        type:elements.Type,
        breed:elements.Breed,
        age:elements.Age,
      });
      newDog.save(function(err){
        if(err){
          console.log(error);
        }
      });
    })
  });
  res.send("Data added to mongodb database");
});

//patch api request to update pet with given petId-------------------------------
app.patch('/api/pet/:petId',async (req,res)=>{
  const petId=req.params.petId;
  let dogs=await excelModel.findById(petId);
  const name1=req.query.name||dogs.name;
  const type1=req.query.type||dogs.type;
  const breed1=req.query.breed||dogs.breed;
  const age1=req.query.age||dogs.age;
  excelModel.findByIdAndUpdate(petId,
    {name:name1,type:type1,breed:breed1,age:age1},
    function(err,docs){
      if(err){
        console.log(err);
      }else{
        res.send("Updated");
      }
    }
  );
})


//delete api request to delete pet with given petId-------------------------------

app.delete('/api/pet/:petId',async (req,res)=>{
  const petId=req.params.petId;
  excelModel.findByIdAndDelete(petId,function(err,docs){
      if(err){
        console.log(err);
      }else{
        res.send("Deleted");
      }
    }
  );
})

//--------------------------------------------------------------------------------
app.listen(3000, function() {
  console.log("Server started successfully!!");
});
