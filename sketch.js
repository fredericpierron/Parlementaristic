var reserve;
var panierMoyen;
var canvas, texte;

function setup() {
  loadJSON('2014_reserve.json', fichierOK);
  canvas = createCanvas(800, 300);
  //background(255);
}

function fichierOK(data) {
  reserve = data;
  if (reserve) {
    // recupérer la dépense totale
    var depenseTotale = 0;
    for (i = 0; i < reserve.length; i++) {
      depense = reserve[i]["Montant"];
      depenseTotale += depense;
    }

    // calculer le panier moyen
    var panierMoyen;
    panierMoyen = depenseTotale / reserve.length;

    // calculer le montant moyen par le nombre de donateur
    var nombreDonateurs = 0;
    var tableauDonateurs = [];
    var nouvelleEntree = true;
    var donateurA = reserve[0].Prénom + ' ' + reserve[0].Nom; // on commence par un nom
    tableauDonateurs[0] = donateurA;
    for (i = 0; i < reserve.length; i++) {
      nouvelleEntree = true;
      var donateurB = reserve[i].Prénom + ' ' + reserve[i].Nom;
      if (donateurB != donateurA) {

        for (j = 0; j < tableauDonateurs.length; j++) {
          if (tableauDonateurs[j] == reserve[i].Prénom + ' ' + reserve[i].Nom) {
            nouvelleEntree = false;
            break;
          }
        }
        if (nouvelleEntree == true) {
          append(tableauDonateurs, reserve[i].Prénom + ' ' + reserve[i].Nom)
          nombreDonateurs++;
        }
        donateurA = donateurB;
      }
    }


    ///// Montant moyen de la subvention par donateur
    var panierMoyenParDonateur = depenseTotale / tableauDonateurs.length;

    ///////// Montant dépensé par député
    var ceDepute = "François FILLON";
    var ceMontant = 0;
    var ceMontantMax = 0;
    var ceMontantMin = 500000; // le montant max est normalement de 240000
    var ceNombreDeSubventions = 0;

    var deX = 10;
    var deHaut = 0;
    var hauteurMax = height - 30;

    for (i = 0; i < reserve.length; i++) {
      if (reserve[i].Prénom + ' ' + reserve[i].Nom == ceDepute) {
        ceMontant += reserve[i].Montant;
        if (ceMontantMax < reserve[i].Montant) {
          ceMontantMax = reserve[i].Montant;
        }
        if (ceMontantMin > reserve[i].Montant) {
          ceMontantMin = reserve[i].Montant;
        }
        ceNombreDeSubventions++
      }
    }
    var ceMontantMoyen = ceMontant / ceNombreDeSubventions;

    //var urlPhoto = 'http://www2.assemblee-nationale.fr/static/tribun/14/photos/';
    var urlPhoto = '/img/';

    var jpgTrouve = false;

    for (i = 0; i < reserve.length; i++) {
      if (reserve[i].Prénom + ' ' + reserve[i].Nom == ceDepute) {
        if (jpgTrouve == false) {
          var jpgNom = reserve[i].ID_Acteur;
          jpgNom = jpgNom.substring(2, jpgNom.length) + '.jpg'
          urlPhoto += jpgNom;
          jpgTrouve = true;
        }
        if (reserve[i].Montant == ceMontantMax) {
          println('trouve ' + reserve[i].Montant + " <> " + ceMontantMax)
          noStroke();
          fill(200, 20, 20);
        } else if (reserve[i].Montant == ceMontantMin) {
          noStroke();
          fill(20, 200, 20);
        } else {
          noStroke();
          fill(125, 125, 125);
        }

        deHaut = map(reserve[i].Montant, ceMontantMin, ceMontantMax, 5, hauteurMax);
        rect(deX, hauteurMax, 10, deHaut * -1);
        deX += 12;
      }

      cetteValeurMoyenne = (ceMontantMoyen * hauteurMax) / ceMontantMax;
      line(5, hauteurMax - cetteValeurMoyenne, (ceNombreDeSubventions * 12) + 15, hauteurMax - cetteValeurMoyenne);
    }
    ////////////// restitution de l'information
    createP('Montant totale de la Réserve Parlementaire: ' + depenseTotale);
    createP('Nombre de donateurs: ' + tableauDonateurs.length);
    createP('Nombre de subventions accordées: ' + reserve.length);
    createP('Montant moyen de la subvention: ' + panierMoyen.toFixed(0) + ' €');
    createP('Montant total moyen de la subvention par donateur: ' + panierMoyenParDonateur.toFixed(0));

    ///////////// Pour un député
    createP('A Propos de la réserve de ' + ceDepute);
    createImg(urlPhoto);
    createP('Montant Total dépensé: ' + ceMontant);
    createP('Nombre de subventions: ' + ceNombreDeSubventions);
    createP('Montant moyen par subvention: ' + ceMontantMoyen.toFixed(2));
    createP('Montant le plus important: ' + ceMontantMax);
    createP('Montant le plus petit: ' + ceMontantMin);
  } // si les données sont chargées


}

function draw() {



}