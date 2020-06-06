function calcA(){
    var xCentiMetros = parseFloat( document.getElementById("x").value );
    var L = parseFloat( document.getElementById("L").value );

    var xMetros = parseFloat( xCentiMetros/100 );
    var thetaARAD = parseFloat( Math.atan(xMetros/L) );
    var thetaADEG = parseFloat( thetaARAD*(180/Math.PI) );

    if( isNaN(thetaADEG) ){
        document.getElementById("thetaA").value = 0;
    }else{
        document.getElementById("thetaA").value = thetaADEG;
    }

    console.log("User input: ");
    console.log("· x = "+xCentiMetros+" centímetros");
    console.log("  · x = "+xMetros+" metros");
    console.log("· L = "+L+" metros");
    console.log("Output: ");
    console.log("· θ = "+thetaADEG+" º");
    console.log(" ");

}


function copiar(){
    var thetaA = parseFloat( document.getElementById("thetaA").value );
    document.getElementById("thetaB").value = thetaA;
    document.getElementById("thetaN").value = thetaA;
}

function menu(){

    if(document.getElementById('variables').selectedIndex == 1){
        document.getElementById('encontrarTheta').style.display='block';
        document.getElementById('encontrarN').style.display='none';

    }else if(document.getElementById('variables').selectedIndex == 2){
        document.getElementById('encontrarTheta').style.display='none';
        document.getElementById('encontrarN').style.display='block';
    }

}


function calcB(){
    var n = parseFloat( document.getElementById("n").value );
    var thetaDEG = parseFloat( document.getElementById("thetaB").value );
    var m = parseFloat( document.getElementById("m").value );

    var dMiliMetros = parseFloat( 1/n );
    var dMetros = parseFloat( dMiliMetros/1000 );
    var thetaRAD = parseFloat( thetaDEG * (Math.PI / 180) );
    var lambdaMetro = parseFloat( (dMetros*(Math.sin(thetaRAD))/m) );
    var lambdaNanometro = lambdaMetro*1e+9;


    if( isNaN(lambdaMetro) ){
        document.getElementById("lambdaMetro").value = 0;
        document.getElementById("lambdaNanometro").value = 0;
    }else{
        document.getElementById("lambdaMetro").value = lambdaMetro;
        document.getElementById("lambdaNanometro").value = lambdaNanometro;
    }
    
    console.log("User input: ");
    console.log("· n = "+n+" lineas/micrómetro");
    console.log("  · d = "+dMetros+" metros");
    console.log("· θ = "+thetaDEG);
    console.log("· m = "+m);
    console.log("Output: ");
    console.log("· λ = "+lambda);
    console.log(" ");

}

function calcC(){
    var lambdaN_NM = parseFloat( document.getElementById("lambdaN").value );
    var mN = parseFloat( document.getElementById("mN").value );
    var thetaN_DEG = parseFloat( document.getElementById("thetaN").value );

    var lambdaN_M = parseFloat(lambdaN_NM/1e+9);
    var sinN = parseFloat( Math.sin(thetaN_DEG*(Math.PI/180)) );
    var d = parseFloat( (lambdaN_M*mN)/sinN );
    var n = parseFloat( 1/d );

    document.getElementById("n_Res").value = n/1000;

    console.log("User input: ");
    console.log("· λ = "+lambdaN_NM+" nm (nanómetros)");
    console.log("  · λ = "+lambdaN_M+" m (metros)");
    console.log("· m = "+mN);
    console.log("· θ = "+thetaN_DEG);
    console.log("Output:");
    console.log("d= "+d);
}