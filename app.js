const express=require("express")
const bodyParser=require("body-parser")
const cors=require('cors')
const cookieParser=require("cookie-parser")
const dotenv=require('dotenv')
dotenv.config(".env");
const PORT=process.env.PORT
const db=require('./config/config.js')
const app=express();
const HomeRoute=require('./Router/HomeRouter.js')
const AboutRoute=require("./Router/AboutRouter.js")
const FooterRoute=require("./Router/FooterRouter.js")
const SliderRoute=require('./Router/SliderRouter.js')
const CasesRoute=require('./Router/CasesRouter.js')
const PartnerRoute=require('./Router/PartnerRouter.js')
const ServicesRoute=require('./Router/ServicesRouter.js')
const TypeOfServicesRoute=require('./Router/TypeOfServicesRouter.js')
const LoginRoute=require('./Router/LoginRouter.js')
const NewPageRoute=require('./Router/NewPageRouter.js')
const NewPageServicesRoute=require('./Router/newpageservicesRouter.js')
const LogoRoute=require('./Router/LogoRouter.js')
const FootrHomeRoute=require('./Router/FooterHomeRouter.js')
const FaviconRoute=require('./Router/FaviconRouter.js')
app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000","http://localhost:3001"],
    methods:["POST","DELETE","GET","PUT"],
    credentials:true
}));
app.use(bodyParser.json()); 
app.use(cookieParser())  
app.use(express.static('images'))
app.use("/home",HomeRoute)
app.use('/about',AboutRoute)
app.use('/footer',FooterRoute)
app.use('/slider',SliderRoute)
app.use('/cases',CasesRoute)
app.use('/partner',PartnerRoute)
app.use('/services',ServicesRoute)
app.use('/typeofservices',TypeOfServicesRoute)
app.use('/auth',LoginRoute)
app.use('/newpage',NewPageRoute)
app.use('/newpageservices',NewPageServicesRoute)
app.use('/logo',LogoRoute)
app.use('/footerhome',FootrHomeRoute)
app.use('/favicon',FaviconRoute)
db.connect((err) => {
    if (err) {
        console.error('Database connection error: ' + err.message);
    } else {
        console.log('Database connected successfully');
        app.listen(8080, () => {
            console.log(`Server is running on port 8080`);
        });
    }
});