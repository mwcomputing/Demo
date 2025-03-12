var alphabet = ["a","b","c","d","e","f","g","h","i","j",
    "k","l","m","n","o","p","q","r","s","t",
    "u","v","w","x","y","z"]
// ********************************************************************************
// Caeser cipher
// ********************************************************************************
function caeser_encrypt(plain_text, key){
    var encrypted = ""
    plain_text = plain_text.toLowerCase()
    for (letter in plain_text){
        if (alphabet.includes(plain_text[letter])){
            var change=(alphabet.indexOf(plain_text[letter].toLowerCase())+key)%26
            encrypted = encrypted + alphabet[change]
        }
    }
    return encrypted.toUpperCase()
}

function caeser_decrypt(cipher_text, key){
    cipher_text = cipher_text.toLowerCase()
    var decrypted = ""
    for (letter in cipher_text){
        if (alphabet.includes(cipher_text[letter])){
            var change = mod(alphabet.indexOf(cipher_text[letter].toLowerCase())-key, 26)
            decrypted = decrypted + alphabet[change]
        }
    }
    return decrypted
}
// ********************************************************************************
// Vigenere Cipher
// ********************************************************************************
function vigenere_makeKey(key_word){
    if(!key_word)
        return null
    var keys = []
    key_word = key_word.toLowerCase()
    for (i in key_word){
        if ( alphabet.includes(key_word[i])){
            keys.push(alphabet.indexOf(key_word[i]))
        }
    }
    if (keys.length ==0)
        return null
    return keys
}

function vigenere_encrypt(plain_text, keys){
    var encrypted = ""
    m = 0
    plain_text = plain_text.toLowerCase()
    for (i in plain_text){
        if (plain_text[i] != " "){
            if (m == keys.length)
                m = 0
            index = (alphabet.indexOf(plain_text[i])+keys[m]) % 26
            encrypted += alphabet[index]
            m += 1
        }
    }
    return encrypted.toUpperCase()
}

function vigenere_decrypt(cipher_text, keys){
    decrypted = ""
    m = 0
    cipher_text = cipher_text.toLowerCase()
    for (i in cipher_text){
        if (m == keys.length)
            m = 0
        index = mod(alphabet.indexOf(cipher_text[i])-keys[m], 26)
        decrypted += alphabet[index]
        m += 1
    }
    return decrypted
}
// ********************************************************************************
// Play Cipher
// ********************************************************************************
letters = [["a","b","c","d","e"],
           ["f","g","h","ij","k"],
           ["l","m","n","o","p"],
           ["q","r","s","t","u"],
           ["v","w","x","y","z"]]

function playFair_makeKey(keyword){
    if(!keyword)
        return null
    comp = ["i","j"]
    for (i in letters){
        for (j in letters[i])
            comp.push(letters[i][j])
    }
    keyword = keyword.toLowerCase()
    var _new = ""
    for (i in keyword){
        if ( ! (_new.includes(keyword[i])) && ((comp.includes(keyword[i]))))
            _new += keyword[i]
    }

    if (_new.includes("j") && _new.includes("i")){
        n = (_new.indexOf("i") < _new.indexOf("j")) ? _new.indexOf("i") : _new.indexOf("j")
        new2 = _new.slice(0,n+1)
        for (i in _new.slice(n+1)){
            if ( ! (_new.slice(n+1)[i] == "i" || _new.slice(n+1)[i] == "j"))
                new2 += _new.slice(n+1)[i]
        }
        _new = new2
    }
    return _new
}


function make_letters(keyword = null){
    if (! keyword)
        return letters
    var store = []
    for(i in keyword){
        if("ij".includes(keyword[i]))
            store.push("ij")
        else
            store.push(keyword[i])
    }
    for(i in letters){
        for(j in letters[i])
            if(! store.includes(letters[i][j]))
                store.push(letters[i][j])
    }
    var new_letters = []
    for(i=0; i<5; i++)
        new_letters.push(store.slice(i*5, (i+1)*5))
    return new_letters
}

function playFair_encrypt(plain_text, keyword=null, pillar="x"){
    plain_text = plain_text.toLowerCase()
    var letters = make_letters(keyword)
    // Compares the given plain text against the provided letters
    var comparator = []
    for(i in letters){
        for(j in letters[i])
            comparator.push(letters[i][j])
    }
    var p_text = ""
    for(i in plain_text){
        if(comparator.includes(plain_text[i]) || "ij".includes(plain_text[i]))
            p_text += plain_text[i]
    }

    // Separates repeating letters with pillar
    var num = (p_text.length % 2 == 0) ? p_text.length-1 : p_text.length-2
    for(i=0; i<num; i+=2){
        if(p_text[i] == p_text[i+1])
            p_text = p_text.slice(0,i+1) + pillar.toLowerCase() + p_text.slice(i+1)
    }

    // Adds pillar to the plain text if applicable
    p_text += (p_text.length % 2 == 1) ? pillar.toLowerCase() : ""

    // The main enryption block
    var encrypted = ""
    for(i=0; i<p_text.length; i+=2){
        var found = 0
        for(j in letters){
            for(k in letters[j]){
                if (letters[j][k].includes(p_text[i])){
                    found += 1
                    row1 = Number(j)
                    column1 = Number(k)
                }
                if (letters[j][k].includes(p_text[i+1])){
                    found += 1
                    row2 = Number(j)
                    column2 = Number(k)
                }
                if (found == 2)
                    break
            }
            if (found == 2)
                break
        }
        if (row1 == row2){
            column1 = (column1+1) % 5
            column2 = (column2+1) % 5
            encrypted += letters[row1][column1][0] + letters[row2][column2][0]
        }else if (column1 == column2){
            row1 = (row1+1) % 5
            row2 = (row2+1) % 5
            encrypted += letters[row1][column1][0] + letters[row2][column2][0]
        }else{
            [column1, column2] = [column2, column1]
            encrypted += letters[row1][column1][0] + letters[row2][column2][0]
        }
    }
    return encrypted.toUpperCase()
}
function playFair_decrypt(cipher_text, keyword=null, pillar="x"){
    cipher_text = cipher_text.toLowerCase()
    var letters = make_letters(keyword)
    // Compares the given plain text against the provided letters
    var comparator = []
    for(i in letters){
        for(j in letters[i])
            comparator.push(letters[i][j])
    }

    for (i in cipher_text){
        if (! (comparator.includes(cipher_text[i]) || "ij".includes(cipher_text[i])))
            return "Invalid ciphertext!"
    }
    var c_text = (cipher_text.length%2==0) ? cipher_text : cipher_text.slice(0,cipher_text.length-1)

    // The main enryption block
    var decrypted = ""
    for(i=0; i<c_text.length; i+=2){
        var found = 0
        for(j in letters){
            for(k in letters[j]){
                if (letters[j][k].includes(c_text[i])){
                    found += 1
                    row1 = Number(j)
                    column1 = Number(k)
                }
                if (letters[j][k].includes(c_text[i+1])){
                    found += 1
                    row2 = Number(j)
                    column2 = Number(k)
                }
                if (found == 2)
                    break
            }
            if (found == 2)
                break
        }
        if (row1 == row2){
            column1 = mod((column1-1), 5)
            column2 = mod((column2-1), 5)
            decrypted += letters[row1][column1][0] + letters[row2][column2][0]
        }else if (column1 == column2){
            row1 = mod((row1-1), 5)
            row2 = mod((row2-1), 5)
            decrypted += letters[row1][column1][0] + letters[row2][column2][0]
        }else{
            [column1, column2] = [column2, column1]
            decrypted += letters[row1][column1][0] + letters[row2][column2][0]
        }
    }
    return decrypted
}
// ********************************************************************************
// HILL CIPHER
// ********************************************************************************
function hill_encrypt(plain_text, key, pillar="x"){
    if (!plain_text)
        return "Empty plain text!"
    determinant = (key.determinant.mod(26))
    var size = key.rowsSize
    plain_text = plain_text.toLowerCase()
    var p_text = ""
    for (hill_enc_i in plain_text){
        if (alphabet.includes(plain_text[hill_enc_i]))
            p_text += plain_text[hill_enc_i]
    }
    for(hei=0; hei<(p_text.length % size); hei++)
        p_text += pillar
    var p_blocks = []
    for (hei=0; hei<Math.ceil(p_text.length/size); hei++){
        p_blocks.push([])
        for (hej in p_text.slice(hei*size,(hei+1)*size))
            p_blocks[hei].push(alphabet.indexOf(p_text.slice(hei*size,(hei+1)*size)[hej]))
    }
    p_blocks = new Matrix(p_blocks)
    var c_blocks = p_blocks.times(key).mod(26)
    var encrypted = ""
    c_blocks.rows.forEach(heelement1 => {
        heelement1.forEach(heelement2 => {
            encrypted += alphabet[heelement2.value]
        });
    });
    return encrypted.toUpperCase()
}

function hill_decrypt(cipher_text, key, pillar="x"){
    // finds the inverse of the key
    var determinant = key.determinant.mod(26)
    var det_inverse = inverse_modulo(determinant.value, 26)
    if (key.rowsSize==1)
        var inverse_key = new Matrix([[det_inverse]])
    else
        var inverse_key = (key.cofactor().transpose().times(det_inverse)).mod(26)

    // Divides the cophertext into blocks
    var size = key.rowsSize
    var c_blocks = []
    cipher_text = cipher_text.toLowerCase()
    for (hei=0; hei<Math.ceil(cipher_text.length/size); hei++){
        c_blocks.push([])
        for (hej in cipher_text.slice(hei*size,(hei+1)*size))
            c_blocks[hei].push(alphabet.indexOf(cipher_text.slice(hei*size,(hei+1)*size)[hej]))
    }
    if (c_blocks[c_blocks.length-1].length != size){
        return "Key size does not match"
    }
    c_blocks = new Matrix(c_blocks)
    var p_blocks = c_blocks.times(inverse_key).mod(26)
    var decrypted = ""
    p_blocks.rows.forEach(heelement1 => {
        heelement1.forEach(heelement2 => {
            decrypted += alphabet[heelement2.value]
        });
    });
    return decrypted
}

// ********************************************************************************
// RAIL  FENCE
// ********************************************************************************
function rail_encrypt(plain_text, depth=null, key=null){
    plain_text = plain_text.toLowerCase()
    p_text = ""
    for(rei in plain_text){
        if (alphabet.includes(plain_text[rei]))
            p_text += plain_text[rei]
    }
    if (key){
        // adds necessary padding to the plain text
        var padding_size = mod(-p_text.length,key.length)
        for(rei=0; rei<padding_size; rei++){
            p_text += alphabet[26-padding_size+rei]
        }
        // Splits the plain text into rows of key size
        var blocks = []
        for (rei=0; rei<Math.ceil(p_text.length/key.length); rei++){
            blocks.push([])
            for (rej in p_text.slice(rei*key.length,(rei+1)*key.length))
                blocks[rei].push(p_text.slice(rei*key.length,(rei+1)*key.length)[rej])
        }
        // Creates a block to hold the plain text according to the key
        var p_blocks = {}
        for(rei in key){
            p_blocks[key[rei]] = []
        }
        // Arranges the plain text elements in a column based on the key
        blocks.forEach(element => {
            for (rei in element){
                p_blocks[key[rei]].push(element[rei])
            }
        });
        // Joins the plain text elements into the resulting ciphertext
        var c_text = ""
        for(rei=1; rei<=key.length; rei++){
            c_text += p_blocks[rei].join("")
        }
        return c_text.toUpperCase()
    }else{
        var p_blocks = []
        for (rei=0; rei<depth; rei++){
            p_blocks.push([])
        }
        for (rei in p_text){
            p_blocks[rei%depth].push(p_text[rei])
        }
        c_text = ""
        p_blocks.forEach(element => {
            element.forEach(element2 => {
                c_text += element2
            });
        });
        return c_text.toUpperCase()
    }
}

function rail_decrypt(cipher_text, depth=null, key=null){
    cipher_text = cipher_text.toLowerCase()
    for (rdi in cipher_text){
        if (!alphabet.includes(cipher_text[rdi]))
            return "Invalid cipher text!"
    }
    if (key){
        var rdn = cipher_text.length/key.length
        var c_blocks = {}
        for(rdi in key){
            c_blocks[Number(rdi)+1] = cipher_text.slice(rdi*rdn, (Number(rdi)+1)*rdn)
        }
        p_text = ""
        for (rdi=0; rdi<rdn; rdi++){
            for (rdj in key){
                p_text += c_blocks[key[rdj]][rdi]
            }
        }
        return p_text
    }else{
        var rdn = cipher_text.length % depth
        var rdm = Math.floor(cipher_text.length/depth)
        var c_blocks = []
        for (rdi=0; rdi<depth; rdi++){
            var rdp = (rdn>0)? 1 : 0
            if (rdi==0){var rdq = 0}
            c_blocks.push(cipher_text.slice(rdi*rdm+rdq,(rdi+1)*rdm+rdp+rdq))
            rdq = rdq+rdp
            rdn--
        }
        var p_text = ""
        for (rdi in c_blocks[0]){
            for (rdj in c_blocks){
                if (c_blocks[rdj].length>rdi){
                    p_text += c_blocks[rdj][rdi]
                }
            }
        }
        return p_text
    }
}
