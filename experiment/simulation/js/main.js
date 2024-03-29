var mto = 0.5;
var lab = [],
    dat = [];
var eqn;
var poles = [],
    roots = [];

function changepage() {
    var x = document.getElementById("pagechanger").value;
    if (x == 1)
        document.getElementById("sm1").click();
    else
        document.getElementById("sm2").click();
}
var conclusion;

function addval() {
    lab = [];
    dat = [];
    var nums, dens;
    var a = "0";
    var b = document.getElementById("numc").value;
    var r = document.getElementById("denc").value;
    var p = document.getElementById("dena").value;
    var q = document.getElementById("denb").value;
    roots = [];
    poles = [];
    var x1, y1;
    var ni = 0,
        di = 0;

    a1 = parseInt(a);
    b1 = parseInt(b);
    a2 = parseInt(p);
    b2 = parseInt(q);

    c2 = parseInt(r) + b1;
    var omega = Math.sqrt(c2);
    var zeta = b2 / 2 / omega;
    var risetime = 1.8/omega;
    var omegad = omega * Math.sqrt(1-zeta*zeta);
    var peaktime = Math.PI/omegad;
    var settingtime = 3/omega/zeta;
    var maxos = Math.pow(Math.E,-1*(Math.PI*zeta/Math.sqrt(1-zeta*zeta)));
    if (zeta == 0)
        conclusion = "The amplitude of the system response does not change with time, therefore system is undamped";
    else if (zeta > 0 && zeta < 1)
        conclusion = "The system response is oscillated through the equilibrium position, with oscillatins gradually decreasing over time therefore system is under damped";
    else if (zeta == 1)
        conclusion = "The system response is ramp up quickly to the equilibrium position without oscillating, and passes it once at most. Therefore system is critical damped";
    else
        conclusion = "The system response moves more slowly toward equilibrium than critical damped system, therefore system is over damped."
    var a3 = b1 / c2;
    var c3 = -1 * b2 / 2 / a2;
    var b3 = -1 * b1 / c2;
    var c1 = 4 * a2 * c2 - b2 * b2;
    if (c1 < 0) {
        c4 = Math.sqrt(-1 * c1) / 2 / a2;
    } else
        c4 = Math.sqrt(c1) / 2 / a2;
    var c5 = c4 * 2 * a2;
    if (c5 != 0)
        b4 = b3 / c5;
    else
        b4 = 0;
    if (b2 == 0)
        b4 = 0;
    var maxl, stepl;
    if (c1 != 0) {
        if (amplitude(a3, b3, b4, c1, c3, c4, 10) == amplitude(a3, b3, b4, c1, c3, c4, 9.8)) {
            maxl = 10;
            stepl = 0.05;
        } else if (amplitude(a3, b3, b4, c1, c3, c4, 25) == amplitude(a3, b3, b4, c1, c3, c4, 25.5)) {
            maxl = 25;
            stepl = 0.125;
        } else if (amplitude(a3, b3, b4, c1, c3, c4, 50) == amplitude(a3, b3, b4, c1, c3, c4, 49)) {
            maxl = 50;
            stepl = 0.25;
        } else if (amplitude(a3, b3, b4, c1, c3, c4, 100) == amplitude(a3, b3, b4, c1, c3, c4, 98)) {
            maxl = 100;
            stepl = 0.5;
        } else if (amplitude(a3, b3, b4, c1, c3, c4, 200) == amplitude(a3, b3, b4, c1, c3, c4, 196)) {
            maxl = 200;
            stepl = 1;
        } else {
            maxl = 1000;
            stepl = 5;
        }
        for (let i = 0; i <= maxl; i = i + stepl) {
            dat.push(amplitud(a3, b3, b4, c1, c3, c4, i));
            lab.push(i.toFixed(1));
        }
    } else {
        var co1 = b1 / c2;
        var co2 = Math.sqrt(c2 / a2);
        var co3 = co1 / Math.sqrt(a2);
        if (amplitudeden(co1, co2, co3, 10) == amplitudeden(co1, co2, co3, 9.8)) {
            maxl = 10;
            stepl = 0.05;
        } else if (amplitudeden(co1, co2, co3, 25) == amplitudeden(co1, co2, co3, 25.5)) {
            maxl = 25;
            stepl = 0.125;
        } else if (amplitudeden(co1, co2, co3, 50) == amplitudeden(co1, co2, co3, 49)) {
            maxl = 50;
            stepl = 0.25;
        } else if (amplitudeden(co1, co2, co3, 100) == amplitudeden(co1, co2, co3, 98)) {
            maxl = 100;
            stepl = 0.5;
        } else if (amplitudeden(co1, co2, co3, 200) == amplitudeden(co1, co2, co3, 196)) {
            maxl = 200;
            stepl = 1;
        } else {
            maxl = 1000;
            stepl = 5;
        }
        for (let i = 0; i <= maxl; i = i + stepl) {
            dat.push(amplitudede(co1, co2, co3, i));
            lab.push(i.toFixed(1));
        }
    }
    lc = 1;
    document.getElementById("line1").setAttribute("style", "color:blue");
    document.getElementById("chartcont").setAttribute("style", "display:none");
    document.getElementById("tanswer").setAttribute("style", "display:none;");
    document.getElementById("chartcont1").setAttribute("style", "display:none;");
    for (let i = 1; i < 3; i++) {
        let out = "out" + i;
        let ln = "line" + (i + 1);
        document.getElementById(ln).setAttribute("Style", "color:black");
        document.getElementById(out).setAttribute("style", "display:none");
    }
    if (mto) {
        document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
        document.getElementById("matwork").title = "";
        document.getElementById("mrun").disabled = false;
        document.getElementById("matwork").setAttribute("style", "opacity:1");
        document.getElementById("mrun").classList.remove("mrundisabled", "mrunenabled");
        document.getElementById("mrun").classList.add("mrunenabled");
        document.getElementById("matwork").classList.remove('mat');
        var numerator = "$${\\frac{";
        if (a != 0)
            numerator = numerator + a + "s^2";
        if (b != 0)
            if (a != 0)
                numerator = numerator + " + " + b;
            else
                numerator = numerator + b;
        numerator = numerator + "}";
        var denominator = "{";
        if (a2 != 0)
            denominator = denominator + a2.toFixed() + "s^2";
        if (b2 != 0)
            if (a2 != 0)
                denominator = denominator + " + " + b2.toFixed() + "s";
            else
                denominator = denominator + b2.toFixed() + "s";
        if (c2 != 0)
            if (b2 != 0)
                denominator = denominator + " + " + c2.toFixed();
            else
                denominator = denominator + c2.toFixed();
        denominator = denominator + "}}$$";
        var eqn = numerator + denominator;

        document.getElementById("out2").innerHTML = eqn;
        var numerator = "$${\\frac{";
        if (a != 0)
            numerator = numerator + a + "s^2";
        if (b != 0)
            if (a != 0)
                numerator = numerator + " + " + b;
            else
                numerator = numerator + b;
        numerator = numerator + "}";
        var denominator = "{";
        if (p != 0)
            denominator = denominator + p + "s^2";
        if (q != 0)
            if (p != 0)
                denominator = denominator + " + " + q + "s";
            else
                denominator = denominator + q + "s";
        if (r != 0)
            if (q != 0)
                denominator = denominator + " + " + r;
            else
                denominator = denominator + r;
        denominator = denominator + "}}$$";
        eqn = numerator + denominator;


        var output;
        document.getElementById("out1").innerHTML = eqn;
        if (c1 > 0)
            eqn = "$${" + a3.toFixed(5) + b3.toFixed(4) + " * e^{" + c3.toFixed(2) + "*t} * " + "cos({" + c4.toFixed(2) + "})....}$$" + "   $${...." + b4.toFixed(4) + " *  e^{" + c3.toFixed(2) + "*t} * " + "sin({" + c4.toFixed(2) + "}) " + "}$$";
        else if (c1 == 0)
            eqn = "$${" + co1.toFixed(5) + "-1*" + co1.toFixed(4) + "* e^{-1*" + co2.toFixed(2) + "*t}" + "-1*" + co3.toFixed(4) + "*e^{-1*" + co2.toFixed(2) + "*t}*t}$$";
        else
            eqn = "$${" + a3.toFixed(5) + b3.toFixed(4) + " * e^{" + c3.toFixed(2) + "*t} * " + "cosh({" + c4.toFixed(2) + "})....}$$" + "$${...." + b4.toFixed(4) + " * e^{" + c3.toFixed(2) + "*t} * " + "sinh({" + c4.toFixed(2) + "}) " + "}$$";

        eqn = eqn+"<br><br>Rise Time:" + risetime.toFixed(2)+ "<br><br>Peak Time:"+peaktime.toFixed(2)+"<br><br>Maximum Overshoot:"+maxos.toFixed(2)+"<br><br>Settling Time:"+settingtime.toFixed(2);
        document.getElementById("tanswer").innerHTML = eqn;
        var j, k;

        var ms = window.matchMedia("(max-width:950px)");
        cwidth(ms);
        ms.addListener(cwidth);

        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out1"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "out2"]);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "tanswer"]);
    } else {
        mto = 1;

        document.getElementById("fconclusions").innerHTML = "Conclusions will show here";
        document.getElementById("mrun").disabled = true;
        document.getElementById("mrun").classList.remove('mrunenabled', 'mrundisabled');
        document.getElementById("tanswer").setAttribute("style", "display:none");
        document.getElementById("mrun").classList.add('mrundisabled');
        document.getElementById("matwork").classList.add('mat');
        document.getElementById("matwork").setAttribute("style", "opacity:0.5");
        document.getElementById("matwork").title = "Please enter the values of coeffecients of the equation first";
    }
};

function discriminant(a, b, c) {
    return b * b - 4 * a * c;
};


function showval() {
    genval("numc", "lc");
    genval("dena", "lp");
    genval("denb", "lq");
    genval("denc", "lr");
};

function genval(idofinput, idofspan) {
    var x;
    x = document.getElementById(idofinput).value;
    //var x1 = x.toFixed(2);
    document.getElementById(idofspan).innerHTML = x;
};

var lc = 1;

function runprog(i) {
    lc = lc + 1;
    if (lc <= 3)
        highlightline(lc);
    else {
        document.getElementById("fconclusions").innerHTML = conclusion;
        document.getElementById("line3").setAttribute("style", "color:black;");
        document.getElementById("mrun").disabled = true;
        var ms = window.matchMedia("screen and (max-width:950px)");
        widthcheck(ms);
        ms.addListener(widthcheck);
        document.getElementById("mrun").disabled = true;
        document.getElementById("mrun").classList.remove("mrunenabled");
        document.getElementById("mrun").classList.add("mrundisabled");
    }
};

function cwidth(ms) {
    if (ms.matches)
        var chartplot = document.getElementById("chartmine").getContext("2d");
    else
        var chartplot = document.getElementById("myChart").getContext("2d");
    if (window.ch != undefined)
        window.ch.destroy();
    const labels = lab;
    const data = {
        labels: labels,

        datasets: [{
            label: "Amplitude",
            data: dat,
            fill: false,
            pointRadius: 1,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    window.ch = new Chart(chartplot, {
        type: "line",
        data: data,
        options: {
            title: {
                display: true,
                text: "Step Response",
                fontSize: 14,
            },
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: "Time" !== ' ',
                        labelString: "Time"
                    },

                }],
                yAxes: [{
                    stacked: false, // `true` for stacked area chart, `false` otherwise
                    beginAtZero: false,
                    scaleLabel: {
                        display: "Amplitude" !== '',
                        labelString: "Amplitude"
                    },


                }]
            },
        }
    });
}

function widthcheck(ms) {
    if (ms.matches)
        document.getElementById("chartcont").setAttribute("style", "display:block;");
    else {
        document.getElementById("chartcont1").setAttribute("style", "display:block;");
        document.getElementById("tanswer").setAttribute("style", "display:block");
    }
}

function highlightline(l) {
    var ln = "line" + l;
    var out = "out" + (l - 1);
    document.getElementById(ln).setAttribute("style", "color:blue;");
    document.getElementById(out).setAttribute("style", "display:block;");
    if (lc != 1)
        ln = "line" + (l - 1);
    document.getElementById(ln).setAttribute("style", "color:black;");
};

var menu_score = 0;

function dispmenu(val) {
    val.classList.toggle("change");
    menu_score = menu_score + 1;
    if (menu_score == 1) {
        document.getElementById("navbar").setAttribute("style", "display:block");
        document.getElementById("simulation-cont").setAttribute("style", "opacity:0.5");
        if (mto != 1)
            document.getElementById("matwork").setAttribute("style", "opacity:1");
        menu_score = -1;
        document.body.style.backgroundColor = "black";
    } else {
        if (mto != 1)
            document.getElementById("matwork").setAttribute("style", "opacity:0.5");
        document.body.style.backgroundColor = "white";
        document.getElementById("simulation-cont").setAttribute("style", "opacity:01");
        document.getElementById("navbar").setAttribute("style", "display:none");
    }
}

function amplitude(a3, b3, b4, c1, c3, c4, t) {
    var cal;
    if (c1 < 0) {
        cal = a3 + b3 * Math.pow(Math.E, c3 * t) * Math.cosh(c4 * t) + b4 * Math.pow(Math.E, c3 * t) * Math.sinh(c4 * t)
    } else {
        cal = a3 + b3 * Math.pow(Math.E, c3 * t) * Math.cos(c4 * t) + b4 * Math.pow(Math.E, c3 * t) * Math.sin(c4 * t)
    }
    cal = cal.toFixed(4);
    return cal;
}

function amplitud(a3, b3, b4, c1, c3, c4, t) {
    var cal;
    if (c1 < 0) {
        cal = a3 + b3 * Math.pow(Math.E, c3 * t) * Math.cosh(c4 * t) + b4 * Math.pow(Math.E, c3 * t) * Math.sinh(c4 * t)
    } else {
        cal = a3 + b3 * Math.pow(Math.E, c3 * t) * Math.cos(c4 * t) + b4 * Math.pow(Math.E, c3 * t) * Math.sin(c4 * t)
    }
    return cal;
}

function amplitudeden(coo1, coo2, coo3, t) {
    var cal;
    cal = coo1 - coo1 * Math.pow(Math.E, -1 * coo2 * t) - coo3 * Math.pow(Math.E, -1 * coo2 * t) * t;
    return cal.toFixed(4);

}

function amplitudede(coo1, coo2, coo3, t) {
    var cal;
    cal = coo1 - coo1 * Math.pow(Math.E, -1 * coo2 * t) - coo3 * Math.pow(Math.E, -1 * coo2 * t) * t;
    return cal;

}