"use strict";
var Parallelprojektion;
(function (Parallelprojektion) {
    let canvas;
    let crc2;
    let divEPoints;
    let divUPoints;
    let vUp = { x: 0, y: 0, z: 1 };
    let n = { x: 1, y: 1, z: 1 };
    let oB = { x: (1 / 3), y: (1 / 3), z: (1 / 3) };
    let u1;
    let u2;
    let u3;
    let e1;
    let e2;
    let e3;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = canvas.getContext("2d");
        divUPoints = document.getElementById("divUPoints");
        divEPoints = document.getElementById("divEPoints");
        calculateVectors();
        calculatePoints();
        drawImage();
    }
    // Berechnung der normierten Vektoren U_1, U_2, U_3
    function calculateVectors() {
        u1 = crossProduct(vUp, n, true);
        u2 = crossProduct(n, u1, true);
        u3 = normaliseVector(n);
        console.log("Die berechneten Punkte U1, U2 und U3 sind: \n U1: ", u1, "\n U2: ", u2, "\n U3: ", u3);
        divUPoints.innerText += "\n U1: \n x: " + u1.x.toPrecision(3) + "\n y: " + u1.y.toPrecision(3) + "\n z: " + u1.z.toPrecision(3);
        divUPoints.innerText += "\n U2: \n x: " + u2.x.toPrecision(3) + "\n y: " + u2.y.toPrecision(3) + "\n z: " + u2.z.toPrecision(3);
        divUPoints.innerText += "\n U3: \n x: " + u3.x.toPrecision(3) + "\n y: " + u3.y.toPrecision(3) + "\n z: " + u3.z.toPrecision(3);
    }
    // Berechnung des Kreuzproduktes aus zwei Vektoren
    function crossProduct(_vec1, _vec2, _normalise) {
        let v = {
            x: ((_vec1.y * _vec2.z) - (_vec1.z * _vec2.y)),
            y: ((_vec1.z * _vec2.x) - (_vec1.x * _vec2.z)),
            z: ((_vec1.x * _vec2.y) - (_vec1.y * _vec2.x))
        };
        if (_normalise) {
            v = normaliseVector(v);
        }
        return v;
    }
    // Normieren eines Vectors
    function normaliseVector(_vec) {
        let length = vectorLength(_vec);
        if (length == 0) {
            return _vec;
        }
        else {
            let v = {
                x: _vec.x / length,
                y: _vec.y / length,
                z: _vec.z / length
            };
            return v;
        }
    }
    // Berechnung der Länge eines Vektors
    function vectorLength(_vec) {
        let length = Math.sqrt((_vec.x * _vec.x) + (_vec.y * _vec.y) + (_vec.z * _vec.z));
        return length;
    }
    // Berechnung der Punkte E_1, E_2, E_3
    function calculatePoints() {
        e1 = {
            x: (1 * u1.x) + (0 * u1.y) + (0 * u1.z) - (1 * ((u1.x * oB.x) + (u1.y * oB.y) + (u1.z * oB.z))),
            y: (1 * u2.x) + (0 * u2.y) + (0 * u2.z) - (1 * ((u2.x * oB.x) + (u2.y * oB.y) + (u2.z * oB.z))),
            z: (1 * u3.x) + (0 * u3.y) + (0 * u3.z) - (1 * ((u3.x * oB.x) + (u3.y * oB.y) + (u3.z * oB.z)))
        };
        e2 = {
            x: (0 * u1.x) + (1 * u1.y) + (0 * u1.z) - (1 * ((u1.x * oB.x) + (u1.y * oB.y) + (u1.z * oB.z))),
            y: (0 * u2.x) + (1 * u2.y) + (0 * u2.z) - (1 * ((u2.x * oB.x) + (u2.y * oB.y) + (u2.z * oB.z))),
            z: (0 * u3.x) + (1 * u3.y) + (0 * u3.z) - (1 * ((u3.x * oB.x) + (u3.y * oB.y) + (u3.z * oB.z)))
        };
        e3 = {
            x: (0 * u1.x) + (0 * u1.y) + (1 * u1.z) - (1 * ((u1.x * oB.x) + (u1.y * oB.y) + (u1.z * oB.z))),
            y: (0 * u2.x) + (0 * u2.y) + (1 * u2.z) - (1 * ((u2.x * oB.x) + (u2.y * oB.y) + (u2.z * oB.z))),
            z: (0 * u3.x) + (0 * u3.y) + (1 * u3.z) - (1 * ((u3.x * oB.x) + (u3.y * oB.y) + (u3.z * oB.z)))
        };
        console.log("Die berechneten Punkte E1, E2 und E3 sind: \n E1: ", e1, "\n E2: ", e2, "\n E3: ", e3);
        divEPoints.innerText += "\n E1: \n x: " + e1.x.toPrecision(3) + "\n y: " + e1.y.toPrecision(3) + "\n z: " + e1.z.toFixed();
        divEPoints.innerText += "\n E2: \n x: " + e2.x.toPrecision(3) + "\n y: " + e2.y.toPrecision(3) + "\n z: " + e2.z.toFixed();
        divEPoints.innerText += "\n E3: \n x: " + e3.x.toPrecision(3) + "\n y: " + e3.y.toPrecision(3) + "\n z: " + e3.z.toFixed();
    }
    // Zeichnung des Bildes der Vektoren U1 und U2, sowie der Ortsvektoren E1, E2 und E3 mit Beschriftungen
    function drawImage() {
        crc2.lineWidth = 2;
        crc2.beginPath();
        crc2.fillStyle = "#ffffff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.closePath();
        crc2.restore();
        //u1
        crc2.beginPath();
        crc2.strokeStyle = "#aaaaaa";
        crc2.fillStyle = "#aaaaaa";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (u1.x * 100), 300 - (u1.y * 100));
        crc2.fillText("u1", (500 + (u1.x * 100)), (300 - (u1.y * 100)));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        //u2
        crc2.beginPath();
        crc2.strokeStyle = "#aaaaaa";
        crc2.fillStyle = "#aaaaaa";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (u2.x * 100), 300 - (u2.y * 100));
        crc2.fillText("u2", (500 + (u2.x * 100)), (310 - (u2.y * 100)));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        //e1
        crc2.beginPath();
        crc2.strokeStyle = "#ff0000";
        crc2.fillStyle = "#ff0000";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (e1.x * 100), 300 - (e1.y * 100));
        crc2.fillText("e1", (490 + (e1.x * 100)), (300 - (e1.y * 100)));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        //e2
        crc2.beginPath();
        crc2.strokeStyle = "#00ff00";
        crc2.fillStyle = "#00ff00";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (e2.x * 100), 300 - (e2.y * 100));
        crc2.fillText("e2", (500 + (e2.x * 100)), (300 - (e2.y * 100)));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        //e3
        crc2.beginPath();
        crc2.strokeStyle = "#0000ff";
        crc2.fillStyle = "#0000ff";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (e3.x * 100), 300 - (e3.y * 100));
        crc2.fillText("e3", (500 + (e3.x * 100)), (300 - (e3.y * 100)));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
    }
})(Parallelprojektion || (Parallelprojektion = {}));
//# sourceMappingURL=main.js.map