function textToBinary(text){
    var bin = [...text].map(char => char.codePointAt().toString(2).padStart(4, "0"))
    bin = bin.join("")
    return bin
}

// KEY FUNCTIONS
// var ls_ci, ls_di
var shiftSchedule = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1]
var permChoice2 =  [14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,
                    26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,
                    51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32]

// var permChoice1 =  [57,49,41,33,25,17,9,1,58,50,42,34,26,18,
//                     10,2,59,51,43,35,27,19,11,3,60,52,44,36,
//                     63,55,47,39,31,23,15,7,62,54,46,38,30,22,
//                     14,6,61,53,45,37,29,21,13,5,28,20,12,4]
var permChoice1 =  [50,43,36,29,22,15,8,
                    1,51,44,37,30,23,16,
                    9,2,52,45,38,31,24,
                    17,10,3,53,46,39,32,
                    25,18,11,4,54,47,40,
                    33,26,19,12,5,55,48,
                    41,34,27,20,13,6,56,
                    49,42,35,28,21,14,7]

function makeKey(key, round){
    var keys = []
    var permutted1 = ""
    for (mki in permChoice1)
        permutted1 += key[permChoice1[mki]-1]
    var ci = permutted1.slice(0,permutted1.length/2)
    var di = permutted1.slice(permutted1.length/2)
    var ls_ci = ci.slice(1) + ci[0]
    var ls_di = di.slice(1) + di[0]
    var pc2_input = ls_ci+ls_di
    var permutted2 = ""
    for (mki in permChoice2)
        permutted2 += (pc2_input)[permChoice2[mki]-1]
    keys.push(permutted2)
    for (mki=1; mki<round; mki++){
        for (mkj=0; mkj<shiftSchedule[mki]; mkj++){
            ls_ci = ls_ci.slice(1) + ls_ci[0]
            ls_di = ls_di.slice(1) + ls_di[0]
        }
        pc2_input = ls_ci+ls_di
        permutted2 = ""
        for (mkj in permChoice2)
            permutted2 += (pc2_input)[permChoice2[mkj]-1]
        keys.push(permutted2)
    
    }
    return keys
}
// var inputkey = "0f1571c947d9e859"
// inputkey = [...inputkey].map(char => parseInt(char, 16).toString(2).padStart(4, "0")).join("")
// var mykeys = makeKey(inputkey, 16)

// INPUT FUNCTIONS
function ip1(input){
    var initPerm = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,
                    57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7]
    var permutted = ""
    for (ip1i in initPerm)
        permutted += input[initPerm[ip1i]-1]
    return permutted
}
function ePermut(input){
    var expansionTable = [32,1, 2, 3, 4, 5,4, 5, 6, 7, 8, 9,8, 9, 10,11,12,13,12,13,14,15,16,17,
                        16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1]
    var expanded = ""
    for (epi in expansionTable)
        expanded += input[expansionTable[epi]-1]
    return expanded
}
function xor(x, y){
    var XORed = ""
    for (xri=0; xri<x.length; xri++)
        XORed += x[xri] ^ y[xri]
    return XORed
}

function sBox(input){
    var boxes = [[[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],
                [4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]],
                [[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],
                [0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]],
                [[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],
                [13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]],
                [[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],
                [10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]],
                [[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],
                [4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]],
                [[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],
                [9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]],
                [[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],
                [1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]],
                [[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],
                [7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]]]
    var sboxed = ""
    for (sbi=0; sbi<input.length/6; sbi++){
        var operand = input.slice(sbi*6,(sbi+1)*6)
        var row = parseInt((operand[0] + operand[5]),2)
        var column = parseInt(operand.slice(1,5),2)
        sboxed += boxes[sbi][row][column].toString(2).padStart(4,"0")
    }
    return sboxed
}

function permut(input){
    var Ptable = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25]
    var permutted = ""
    for (pi in Ptable)
        permutted += input[Ptable[pi]-1]
    return permutted
}

function inv_ip1(input){
    inverseIp = [40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,
                36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25]
    var permutted = ""
    for (iip1i in inverseIp)
        permutted += input[inverseIp[iip1i]-1]
    return permutted
}
function DES(input, key){
    var output = ""
    for (di=0; di<Math.ceil(input.length/64); di++){
        var operand = (input.length>(di+1)*64)? input.slice(di*64, (di+1)*64) : input.slice(di*64).padStart(64, "0")
        var permutted = ip1(operand)
        var li = permutted.slice(0,permutted.length/2)
        var ri = permutted.slice(permutted.length/2)
        for(dj=0; dj<16; dj++){
            var epermutted = ePermut(ri)
            var XORed = xor(epermutted, key[dj])
            var sboxed = sBox(XORed)
            var pPermutted = permut(sboxed)
            var XORed2 = xor(li, pPermutted)
            li = ri
            ri = XORed2
        }
        output += inv_ip1(ri+li)
    }
    return output
}
// var input = "02468aceeca86420"
// input = [...input].map(char => parseInt(char, 16).toString(2).padStart(4, "0")).join("")
// cipher_text = DES(input, mykeys)
// document.write(parseInt(cipher_text,2).toString(16),"<br>")

// document.write("----------------------------------------------------------------------------","<br>")

// var ptext = DES(cipher_text, mykeys.reverse())
// document.write(parseInt(ptext,2).toString(16))