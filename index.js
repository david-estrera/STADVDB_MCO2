import express from "express";
import bodyParser from "body-parser"
import {createClient} from '@supabase/supabase-js'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

const supabaseUrl1 = 'https://byxjzrnusrpulzqhyavg.supabase.co'
const supabaseKey1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5eGp6cm51c3JwdWx6cWh5YXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Njc1OTQsImV4cCI6MjAyODI0MzU5NH0.OeowEgA_o1GiUMdksA9fIfOcVwsuvDTzk8gUxwI4GdY'
const supabase1 = createClient(supabaseUrl1, supabaseKey1)
  


const supabaseUrl2 = 'https://yewugmojdepnwptydtpq.supabase.co'
const supabaseKey2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld3VnbW9qZGVwbndwdHlkdHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzOTk1NzEsImV4cCI6MjAyNzk3NTU3MX0.q_a-zQy55oy0LsEB_RUYMkGFFjxIEf5KBj_OMN9DDCw'
const supabase2 = createClient(supabaseUrl2, supabaseKey2)

const supabaseUrl3 = 'https://hifovlhxyxgxgzitotmg.supabase.co'
const supabaseKey3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZm92bGh4eXhneGd6aXRvdG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzOTk2NzksImV4cCI6MjAyNzk3NTY3OX0.RhGBXsIJ1HwsFo33dBcVMfYy2FMBQYrn1MOjgT3XNXU'
const supabase3 = createClient(supabaseUrl3, supabaseKey3)

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})
