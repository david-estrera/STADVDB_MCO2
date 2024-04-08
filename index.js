import express from "express";
import bodyParser from "body-parser"
import {createClient} from '@supabase/supabase-js'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

const supabaseUrl1 = ''
const supabaseKey1 = ''
const supabase1 = createClient(supabaseUrl1, supabaseKey1)
  


const supabaseUrl2 = ''
const supabaseKey2 = ''


const supabaseUrl3 = ''
const supabaseKey3 = ''
const supabase3 = createClient(supabaseUrl2, supabaseKey2)

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})
