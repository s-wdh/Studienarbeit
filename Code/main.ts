namespace Parallelprojektion {

    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    interface Vector {
        x: number;
        y: number;
        z: number;
    }
    let vUp: Vector = { x: 0, y: 0, z: 1 };
    let n: Vector = { x: 1, y: 1, z: 1 };
    let u1: Vector;
    let u2: Vector;
    let u3: Vector;
    let e1: Vector;
    let e2: Vector;
    let e3: Vector;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        calculateVectors();
        calculatePoints();
        drawImage();
    }

    // Berechnung der normierten Vektoren U_1, U_2, U_3
    function calculateVectors(): void {
        u1 = crossProduct(vUp, n, true);
        u2 = crossProduct(n, u1, true);
        u3 = standardiseVector(n);
        console.log(u1, u2, u3);
    }

    // Berechnung des Kreuzproduktes aus zwei Vektoren
    function crossProduct(_vec1: Vector, _vec2: Vector, _standardise: boolean): Vector {
        let v: Vector = {
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
    function standardiseVector(_vec: Vector): Vector {
        let length: number = vectorLength(_vec);
        let v: Vector = {
            x: _vec.x / length,
            y: _vec.y / length,
            z: _vec.z / length
        };
        return v;
    }
    //Berechnung der Länge eines Vektors
    function vectorLength(_vec: Vector): number {
        let length: number = Math.sqrt((_vec.x * _vec.x) + (_vec.y * _vec.y) + (_vec.z * _vec.z));
        return length;
    }

    // Berechnung der Punkte E_1, E_2, E_3
    function calculatePoints(): void {
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

    function drawImage(): void {
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
}