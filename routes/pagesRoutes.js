const express = require("express")
const connection = require("../database")
const router = express.Router()
const db = require("../database") 
const {check, validationResult} = require("express-validator")
const session = require("express-session")



router.use(session({
    secret: "secret key",
    resave: true,
    saveUninitialized: true
}))


router.get('/',(req,res)=>{
    res.render('index')
})

 

//Traitement des données du formulaire

router.post("/", [

    check("nom", "Le nom doit comporter au moins 3 caractères")
        .exists()
        .isLength({min: 3})
        .trim()
        .escape(),
    check("prenom", "Le prénom doit comporter au moins 3 caractères")
        .isLength({min:3})
        .trim()
        .escape(),
    check("email", "Entrer une adresse e-mail correcte")
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape(),
    check("password", "Le mot de passe doit commporter au minimum 7 caractères")
        .exists()
        .isLength({min:7})
        .trim()
        .escape()

], (req,res)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        const alerts = errors.array()
        res.status(200).render("index",{alerts})
    }
    else{


        let nom = req.body.nom
        let prenom = req.body.prenom
        let email = req.body.email
        let password = req.body.password
        
        
        connection.query("SELECT * FROM utilisateurs WHERE email= ?", [email], (err, resultats)=>{
            if(err){

                console.log(err)
                res.status(500).render("erreur", {err})
            }
            else
            {
                /* res.render("login") */
                for(resultat of resultats){
                    resultat
                    
                }

                //Si les email de sont différents, on insère les données
                if(email != resultat.email)
                {   


                    //Probème à résoudre
                    connection.query("INSERT INTO utilisateur (id, nom, prenom, email, password) VALUES(?, ?, ?, ?, ?)",
                        [null, nom, prenom, email, password], (err)=>{
                            if(err){
                                throw err
                            }
                            else
                            {
                                let successMsg = "Vous avez été incrit(e) avec succès"
                                res.render("accueil", {successMsg})
                            }
                        }) 

                    let msgErrors = "Infos enrgistrées"
                    res.status(200).render("login", {msgErrors})
                }
                else{
                    
                    
                    let msgErrors = "Ce compte existe déjà ahhh"
                    res.status(200).render("accueil", {msgErrors})

                }
                     
            }
        })


    }

         
})





//-------------------------Traitement de la page connexion-----------------------------------//




module.exports = router;



