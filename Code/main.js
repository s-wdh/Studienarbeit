"use strict";
var Parallelprojektion;
(function (Parallelprojektion) {
    let canvas;
    let crc2;
    let vUp = { x: 0, y: 0, z: 1 };
    let n = { x: 1, y: 1, z: 1 };
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
        calculateVectors();
        calculatePoints();
        drawImage();
    }
    // Berechnung der normierten Vektoren U_1, U_2, U_3
    function calculateVectors() {
        u1 = crossProduct(vUp, n, true);
        u2 = crossProduct(n, u1, true);
        u3 = standardiseVector(n);
        console.log(u1, u2, u3);
    }
    // Berechnung des Kreuzproduktes aus zwei Vektoren
    function crossProduct(_vec1, _vec2, _standardise) {
        let v = {
            x: ((_vec1.y * _vec2.z) - (_vec1.z * _vec2.y)),
            y: ((_vec1.z * _vec2.x) - (_vec1.x * _vec2.z)),
            z: ((_vec1.x * _vec2.y) - (_vec1.y * _vec2.x))
        };
        if (_standardise) {
            v = standardiseVector(v);
        }
        return v;
    }
    // Normieren eines Vectors
    function standardiseVector(_vec) {
        let length = vectorLength(_vec);
        let v = {
            x: _vec.x / length,
            y: _vec.y / length,
            z: _vec.z / length
        };
        return v;
    }
    //Berechnung der Länge eines Vektors
    function vectorLength(_vec) {
        let length = Math.sqrt((_vec.x * _vec.x) + (_vec.y * _vec.y) + (_vec.z * _vec.z));
        return length;
    }
    // Berechnung der Punkte E_1, E_2, E_3
    function calculatePoints() {
        e1 = {
            x: (1 * u1.x),
            y: (1 * u2.x),
            z: (0)
        };
        e2 = {
            x: (1 * u1.y),
            y: (1 * u2.y),
            z: (0)
        };
        e3 = {
            x: (1 * u1.z),
            y: (1 * u2.z),
            z: (0)
        };
        console.log(e1, e2, e3);
    }
    function drawImage() {
        crc2.beginPath();
        crc2.fillStyle = "#ffffff";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.closePath();
        crc2.restore();
        //e1
        crc2.beginPath();
        crc2.strokeStyle = "#ff0000";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (e1.x * 100), 300 - (e1.y * 100));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        //e2
        crc2.beginPath();
        crc2.strokeStyle = "#00ff00";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (e2.x * 100), 300 - (e2.y * 100));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
        //e3
        crc2.beginPath();
        crc2.strokeStyle = "#0000ff";
        crc2.moveTo(500, 300);
        crc2.lineTo(500 + (e3.x * 100), 300 - (e3.y * 100));
        crc2.stroke();
        crc2.closePath();
        crc2.restore();
    }
})(Parallelprojektion || (Parallelprojektion = {}));
//# sourceMappingURL=main.js.map