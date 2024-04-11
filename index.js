import express from "express";
import bodyParser from "body-parser"
import {createClient} from '@supabase/supabase-js'

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));



//Global
const supabaseUrl1 = 'https://byxjzrnusrpulzqhyavg.supabase.co'
const supabaseKey1 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5eGp6cm51c3JwdWx6cWh5YXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2Njc1OTQsImV4cCI6MjAyODI0MzU5NH0.OeowEgA_o1GiUMdksA9fIfOcVwsuvDTzk8gUxwI4GdY'
const supabase1 = createClient(supabaseUrl1, supabaseKey1)
  
//Luzon
const supabaseUrl2 = 'https://yewugmojdepnwptydtpq.supabase.co'
const supabaseKey2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlld3VnbW9qZGVwbndwdHlkdHBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzOTk1NzEsImV4cCI6MjAyNzk3NTU3MX0.q_a-zQy55oy0LsEB_RUYMkGFFjxIEf5KBj_OMN9DDCw'
const supabase2 = createClient(supabaseUrl2, supabaseKey2)

//VisMin
const supabaseUrl3 = 'https://hifovlhxyxgxgzitotmg.supabase.co'
const supabaseKey3 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpZm92bGh4eXhneGd6aXRvdG1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzOTk2NzksImV4cCI6MjAyNzk3NTY3OX0.RhGBXsIJ1HwsFo33dBcVMfYy2FMBQYrn1MOjgT3XNXU'
const supabase3 = createClient(supabaseUrl3, supabaseKey3)


const queue1 = [];
const queue2 = [];
const queue3 = [];

app.get("/", (req,res) => {
    res.render("index.ejs");
})

app.get("/luzon", async (req,res) => {
    console.log("Getting data from node 1...");
let { data: appointments, error } = await supabase1
.from('appointments')
.select('*')
.eq('a_region', 'L')
.order('a_queuetime', { ascending: false });

if(error){
    console.log("Error getting data from node 1");
    console.log("Getting data from node 2...");
    let { data: appointments, error } = await supabase2
    .from('appointments')
    .select('*')
    .eq('a_region', 'L')
    .order('a_queuetime', { ascending: false });
    res.json(appointments);
}

res.json(appointments);
})

app.get("/visayas", async (req,res) => {
    console.log("Getting data from node 1...");
    let { data: appointments, error } = await supabase1
    .from('appointments')
    .select('*')
    .eq('a_region', 'V')
    .order('a_queuetime', { ascending: false });

    if(error){
        console.log("Error getting data from node 1");
        console.log("Getting data from node 3...");
        let { data: appointments, error } = await supabase3
        .from('appointments')
        .select('*')
        .eq('a_region', 'V')
        .order('a_queuetime', { ascending: false });
        res.json(appointments);
    }

    res.json(appointments);
})

app.get("/mindanao", async (req,res) => {
    console.log("Getting data from node 1...");
    let { data: appointments, error } = await supabase1
    .from('appointments')
    .select('*')
    .eq('a_region', 'M')
    .order('a_queuetime', { ascending: false });

    if(error){
        console.log("Error getting data from node 1");
        console.log("Getting data from node 3...");
        let { data: appointments, error } = await supabase2
        .from('appointments')
        .select('*')
        .eq('a_region', 'M')
        .order('a_queuetime', { ascending: false });
        res.json(appointments);
    }

    res.json(appointments);
})

app.post("/addAppointment", async (req,res) => {
    try {
        let id = generateUUID();
        console.log("ID: " + id);
        console.log(req.body);
        //Luzon
        req = req.body;
        req.id = id;
        if(req.region == 'L'){


        let { data: data1, error: error1 } = await supabase1
        .from('appointments')
        .insert([
        {a_id: req.id, a_region: req.region, a_status: req.status,
        a_queuetime: req.queuetime, a_queuedate: req.queuedate,
        a_starttime: req.starttime, a_endtime: req.endtime,
        a_type: req.type, a_isvirtual: req.isvirtual},
        ])
        .select() 
        console.log("data1: "+data1);
        console.log("error1: "+error1);
        if(error1){
            console.log("Unsuccessful insert to Node 1: "+req.id);
            queue1.push(req);
        } else {
            console.log("Successful insert to Node 1: "+req.id);
        }


        let { data: data2, error: error2 } = await supabase2
        .from('appointments')
        .insert([
        {a_id: req.id, a_region: req.region, a_status: req.status,
        a_queuetime: req.queuetime, a_queuedate: req.queuedate,
        a_starttime: req.starttime, a_endtime: req.endtime,
        a_type: req.type, a_isvirtual: req.isvirtual},
        ])
        .select()
        console.log("data2 "+data2);
        console.log("error2: "+error2);
        if(error2){
            console.log("Unsuccessful insert to Node 2: "+req.id);
            queue2.push(req);
        } else {
            console.log("Successful insert to Node 2: "+req.id);
        }

        if(!error1){
            res.render("index.ejs");
            } else {
                res.render("index.ejs");
            } 
        } else {
        //VisMin
        let { data: data1, error: error1 } = await supabase1
        .from('appointments')
        .insert([
        {a_id: req.id, a_region: req.region, a_status: req.status,
        a_queuetime: req.queuetime, a_queuedate: req.queuedate,
        a_starttime: req.starttime, a_endtime: req.endtime,
        a_type: req.type, a_isvirtual: req.isvirtual},
        ])
        .select()

        if(error1){
            console.log("Unsuccessful insert to Node 1: "+req.id);
            queue1.push(req);
        } else {
            console.log("Successful insert to Node 1: "+req.id);
        }


        let { data: data3, error: error3 } = await supabase3
        .from('appointments')
        .insert([
        {a_id: req.id, a_region: req.region, a_status: req.status,
        a_queuetime: req.queuetime, a_queuedate: req.queuedate,
        a_starttime: req.starttime, a_endtime: req.endtime,
        a_type: req.type, a_isvirtual: req.isvirtual},
        ])
        .select()

        if(error3){
            console.log("Unsuccessful insert to Node 3: "+req.id);
            queue3.push(req);
        } else {
            console.log("Successful insert to Node 3: "+req.id);
        }

        if(!error1){
            res.render("index.ejs");
            } else {
                res.render("index.ejs");
            } 

        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }

})

// Function to periodically check and retry failed inserts
async function checkAndRetry() {
    while (true) {
        if(queue1.length != 0){
            console.log("Server retrying to insert in Node 1...");
            // test connection
            let { data: appointments, error } = await supabase1
            .from('appointments')
            .select('*')

            if(!error){ //if connected
                let req = queue1.shift(); // Retrieve the data from the queue
                let { data: data1, error: error1 } = await supabase1
                .from('appointments')
                .insert([
                {a_id: req.id, a_region: req.region, a_status: req.status,
                a_queuetime: req.queuetime, a_queuedate: req.queuedate,
                a_starttime: req.starttime, a_endtime: req.endtime,
                a_type: req.type, a_isvirtual: req.isvirtual},
                ])
                .select()

                if(error1){
                    console.log("Unsuccessful insert to Node 1: "+req.id);
                    queue1.push(req);
                } else {
                    console.log("Successful insert to Node 1: "+req.id);
                }
            } else {
                console.log("Failed to insert in Node 1");
            }
        }

        if(queue2.length != 0){
            console.log("Server retrying to insert in Node 2...");
            // test connection
            let { data: appointments, error } = await supabase2
            .from('appointments')
            .select('*')

            if(!error){ //if connected
                let req = queue2.shift(); // Retrieve the data from the queue
                let { data: data2, error: error2 } = await supabase2
                .from('appointments')
                .insert([
                {a_id: req.id, a_region: req.region, a_status: req.status,
                a_queuetime: req.queuetime, a_queuedate: req.queuedate,
                a_starttime: req.starttime, a_endtime: req.endtime,
                a_type: req.type, a_isvirtual: req.isvirtual},
                ])
                .select()

                if(error2){
                    console.log("Unsuccessful insert to Node 2: "+req.id);
                    queue2.push(req);
                } else {
                    console.log("Successful insert to Node 2: "+req.id);
                }
            } else {
                console.log("Failed to insert in Node 2");
            }
        }

        if(queue3.length != 0){
            console.log("Server retrying to insert in Node 3...");
            // test connection
            let { data: appointments, error } = await supabase3
            .from('appointments')
            .select('*')

            if(!error){ //if connected
                let req = queue1.shift(); // Retrieve the data from the queue
                let { data: data3, error: error3 } = await supabase3
                .from('appointments')
                .insert([
                {a_id: req.id, a_region: req.region, a_status: req.status,
                a_queuetime: req.queuetime, a_queuedate: req.queuedate,
                a_starttime: req.starttime, a_endtime: req.endtime,
                a_type: req.type, a_isvirtual: req.isvirtual},
                ])
                .select()

                if(error3){
                    console.log("Unsuccessful insert to Node 3: "+req.id);
                    queue3.push(req);
                } else {
                    console.log("Successful insert to Node 3: "+req.id);
                }
            } else {
                console.log("Failed to insert in Node 3");
            }
        }
        await new Promise(resolve => setTimeout(resolve, 5000)); // Retry every 10 seconds
    }
}

app.delete("/deleteAppointment/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // Attempt to delete the appointment from all three databases
        const { data: data1, error: error1 } = await supabase1
            .from('appointments')
            .delete()
            .eq('a_id', id);
        const { data: data2, error: error2 } = await supabase2
            .from('appointments')
            .delete()
            .eq('a_id', id);
        const { data: data3, error: error3 } = await supabase3
            .from('appointments')
            .delete()
            .eq('a_id', id);

        // Check if any of the operations encountered errors
        if (error1 || error2 || error3) {
            console.log(`Error deleting appointment with ID ${id}:`, error1 || error2 || error3);
            res.status(500).json({ error: 'Failed to delete appointment' });
        } else {
            console.log(`Successfully deleted appointment with ID ${id}`);
            res.status(200).json({ message: 'Appointment deleted successfully' });
        }
    } catch (error) {
        console.log(`Error deleting appointment with ID ${id}:`, error);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});


function generateUUID() {
    // Generate a random hexadecimal string for each section of the UUID
    const section1 = Math.random().toString(16).slice(2, 10);
    const section2 = Math.random().toString(16).slice(2, 6);
    const section3 = Math.random().toString(16).slice(2, 6);
    const section4 = Math.random().toString(16).slice(2, 6);
    const section5 = Math.random().toString(16).slice(2, 14);
    
    // Concatenate the sections with dashes in the specified format
    const uuid = `${section1}-${section2}-${section3}-${section4}-${section5}`;
    
    return String(uuid);
}

checkAndRetry()

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})
