function mod(a ,b){
    return ((a % b) + b ) % b
}

function modulo(number, index, mod){
    var binary = index.toString(2)
    var num = number
    for(bit=1; bit<binary.length; bit++){
        num = (num**2) % mod
        if (Number(binary[bit]) == 1)
            num = (num*number) % mod        
    }
    return num
}

// ************************************************************************************************
// PRIME ROOTS
// ************************************************************************************************
function prime_root(prime_number, mode="all"){
    var mods = []
    var p_roots = []
    var ln = prime_number.toString().length
    for(pri=2; pri<prime_number; pri++){
        for(prj=1; prj<prime_number; prj++){
            var num = modulo(pri, prj, prime_number)
            ln2 = num.toString().length
            for(prk=0; prk<ln-ln2; prk++)
                num = "0" + num
            mods.push(num)
        }
        mods.sort()
        var flag = mods.every(function (a,b){return a-1==b})
        if (flag){
            p_roots.push(pri)
            if (mode=="one")
                return p_roots
        }
        mods = []
    }
    return p_roots
}

// ************************************************************************************************
// GRETEST COMMON DIVISOR
// ************************************************************************************************
function gcd(first_number, second_number, show_working="no", return_type="gcd"){
    if (return_type=="steps")
        var working_steps = []
    first_number = Math.abs(first_number)
    second_number = Math.abs(second_number)
    var gcd_a = Math.max(first_number, second_number)
    var gcd_b = Math.min(first_number, second_number)
    if (gcd_b == 0)
        return gcd_a
    var gcd_q, gcd_r
    do{
        gcd_q = Math.floor(gcd_a/gcd_b)
        gcd_r = gcd_a % gcd_b
        if (show_working=="yes")
            document.write(gcd_a + " = " + gcd_b + "x" + gcd_q +  " + " + gcd_r + "<br>")
        if (return_type=="steps" & gcd_r!=0)
            working_steps.push({a:gcd_a, b:gcd_b, q:gcd_q, r:gcd_r})
        if(gcd_r>0){
            gcd_a = gcd_b
            gcd_b = gcd_r
        }
    }while(gcd_r>0)
    if (return_type=="steps")
        return working_steps
    else
        return gcd_b
}

// ************************************************************************************************
// INVERSE MODULO
// ************************************************************************************************
function inverse_modulo(first_number, second_number, show_working="no"){
    if (gcd(first_number,second_number) != 1){
        document.write("The numbers are not relatively prime")
        return
    }
    if (first_number < 0)
        first_number = mod(first_number, second_number)
    var temp = gcd(first_number,second_number,"no","steps")
    var container = []
    temp.reverse().forEach(inv_m_element => {
        container.push(inv_m_element)
    });
    var p = 1
    var y = -(container[0]["q"])
    var m = container[0]["a"]
    var n = container[0]["b"]
    var c
    if (show_working=="yes")
        document.write("1 = "+p+"x"+container[0]["a"]+" + "+y+"x"+container[0]["b"]+"<br>")
    container.slice(1).forEach(inv_m_element => {
        c = (y*-inv_m_element["q"]+p)
        p = y
        y = c
        m = inv_m_element["a"]
        n = inv_m_element["b"]
        if (show_working=="yes")
            document.write("1 = "+p+"x"+m+" + "+y+"x"+n+"<br>")
    });
    if (first_number < second_number)
        var inverse = mod(y,m)
    else
        var inverse = mod(p,n)
    return inverse
}

// ************************************************************************************************
// FRACTION OBJECT
// ************************************************************************************************
class Fraction{
    constructor(numerator, denominator=1){
        if (denominator == 0){
            document.write("Invalid fraction")
            return
        }
        
        var factor = gcd(numerator, denominator)
        if (numerator == 0){
            factor = 1
            denominator = 1
        }
        if (denominator<0)
            numerator = -(numerator)
    
        this.numerator = numerator/factor
        this.denominator = Math.abs(denominator/factor)
        this.value = numerator/denominator
    }

    show_frc(){
        if (this.denominator == 1)
            document.write(this.numerator)
        else
            document.write(this.numerator, "/", this.denominator)
    }

    inverse(){
        var denominator = Math.abs(this.numerator)
        var numerator = (this.numerator<0) ? -(this.denominator) : this.denominator
        return new Fraction(numerator, denominator)
    }

    times(other){
        if (other instanceof Fraction){
            var numerator = this.numerator*other.numerator
            var denominator = this.denominator*other.denominator
        }else{
            var numerator = this.numerator*other
            var denominator = this.denominator
        }
        return new Fraction(numerator, denominator)
    }

    divideby(other){
        if (other instanceof Fraction)
            var operand = other.inverse()
        else
            var operand = new Fraction(other).inverse()
        return this.times(operand)
    }

    divides(other){
        var operand = this.inverse()
        return operand.times(other)
    }

    plus(other){
        if (other instanceof Fraction){
            var denominator = this.denominator*other.denominator
            var numerator = this.numerator*other.denominator + other.numerator*this.denominator
        }else{
            var denominator = this.denominator
            var numerator = this.numerator + other*this.denominator
        }
        return new Fraction(numerator, denominator)
    }

    minus(other){
        if (other instanceof Fraction){
            var denominator = this.denominator*other.denominator
            var numerator = this.numerator*other.denominator - other.numerator*this.denominator
        }else{
            var denominator = self.denominator
            var numerator = this.numerator - other*this.denominator
        }
        return new Fraction(numerator, denominator)
    }
    mod(other){
        if (!(other instanceof Fraction)){
            if (this.denominator==1)
                return new Fraction(mod(this.numerator,other))
        }
    }
}
// ************************************************************************************************
// MATRIX OBJECT
// ************************************************************************************************
class Matrix{
    constructor(rows=0, columns=0, range=100){
        var matrix = []

        // ----------------------------------------------------------------------
        // AUTOMATICALLY CREATES A MATRIX
        // ----------------------------------------------------------------------
        if (typeof(rows) == "number"){
            for (var cons_mat_i=0;cons_mat_i<rows;cons_mat_i++){
                matrix.push([])
                for (var cons_mat_j=0;cons_mat_j<columns;cons_mat_j++){
                    var cons_mat_num = Math.floor(Math.random()*range)
                    matrix[cons_mat_i].push(new Fraction(cons_mat_num))
                }
            }
        // ----------------------------------------------------------------------
        // MANUALLY CREATES A MATRIX
        // ----------------------------------------------------------------------
        }else{
            if (!(rows instanceof Array) || rows.length == 0){
                document.write("Invalid matrix!")
                return
            }
            if (!(rows[0][0] instanceof Fraction)){
                var matrix = []
                for (cons_mat_i in rows){
                    matrix.push([])
                    rows[cons_mat_i].forEach(element => {
                        matrix[cons_mat_i].push(new Fraction(element))
                    });
                }
            }else
                matrix = rows
        }
        // ----------------------------------------------------------------------
        // PROPERTIES ASSIGNMENT
        // ----------------------------------------------------------------------
        this.rows = matrix
        this.rowsSize = matrix.length
        this.columnsSize = matrix[0].length
        this.determinant = null
        this.issquare = (matrix.length == matrix[0].length) ? true : false
        this.isdiagonal = false
        this.isidentity = false
        var mat = []
        for (cons_mat_i in this.rows[0]){
            mat.push([])
            this.rows.forEach(element => {
                mat[cons_mat_i].push(element[cons_mat_i])
            });
        }
        this.columns = mat
        if (this.issquare){
            var diag = []
            for (cons_mat_i in this.rows)
                diag.push(this.rows[cons_mat_i][cons_mat_i])
            this.diagonal = diag
            this.isdiagonal = true
            this.isidentity = true
            for(cons_mat_i in this.rows){
                for(cons_mat_j in this.rows[cons_mat_i]){
                    if (cons_mat_i==cons_mat_j){
                        if (this.rows[cons_mat_i][cons_mat_j].value != 1)
                            this.isidentity = false
                    }else if (this.rows[cons_mat_i][cons_mat_j].value != 0){
                        this.isdiagonal = false
                        this.isidentity = false
                        break
                    }
                }
            }
        }

    }
    // ----------------------------------------------------------------------
    // Outputs the matrix
    // ----------------------------------------------------------------------
    show_mat(){
        this.rows.forEach(element1 => {
            element1.forEach(element2 => {
                element2.show_frc()
                document.write(" ")
            });
            document.write("<br>")
        });
    }
    // ----------------------------------------------------------------------
    // Vector multiplication
    // ----------------------------------------------------------------------
    times(operand){
        if (!(operand instanceof Matrix)){
            var mat_result = []
            this.rows.forEach(sm_mat_i => {
                mat_result.push([])
                sm_mat_i.forEach(sm_mat_j => {
                    sm_mat_j = sm_mat_j.times(operand)
                    mat_result[this.rows.indexOf(sm_mat_i)].push(sm_mat_j)
                });
            });
            return new Matrix(mat_result)
        }
        if (this.columnsSize!=operand.rowsSize){
            document.write("Can't multiply the two matrices!")                
            return
        }
        var resultant = []
        for (var vmult_mat_i in this.rows){
            resultant.push([])
            for (var vmult_mat_k in operand.rows[0]){
                var vmult_mat_n = new Fraction(0)
                for (var vmult_mat_j in this.rows[vmult_mat_i]){
                    var product = this.rows[vmult_mat_i][vmult_mat_j].times(operand.rows[vmult_mat_j][vmult_mat_k])
                    vmult_mat_n = vmult_mat_n.plus(product)
                }
                resultant[vmult_mat_i].push(vmult_mat_n.value)
            }
        }
        return new Matrix(resultant)
    }
    // ----------------------------------------------------------------------
    // Transpose
    // ----------------------------------------------------------------------
    transpose(){
        return new Matrix(this.columns)
    }
    // ----------------------------------------------------------------------
    // Determinant
    // ----------------------------------------------------------------------
    find_determinant(){
        if (!this.issquare)
            document.write("The matrix is not a sqaure matrix")
        else if (this.isdiagonal){
            if (this.isidentity)
                this.determinant = new Fraction(1)
            else{
                var determinant = new Fraction(1)
                this.diagonal.forEach(det_mat_i => {
                    determinant = determinant.times(det_mat_i)
                });
                this.determinant = determinant
            }
        }
        else{
            if (!this.diagonal.every(elmnt => {return elmnt.value!=0})){
                document.write("There is a 0 pivot")
                return
            }
            var tri_mat = []
            this.rows.forEach(mat_elmnt => {tri_mat.push(mat_elmnt.slice())})
            for (var mat_i in this.columns.slice(0,this.columns.length-1)){
                var mat = []
                tri_mat.forEach(mat_h => {mat.push(mat_h[mat_i])})
                var op_column = mat.slice()
                var operand = tri_mat[mat_i]
                var mat_j
                for (mat_j=Number(mat_i)+1; mat_j<op_column.length; mat_j++){
                    if (op_column[mat_j].numerator !=0){
                        var coefficient = (op_column[mat_j]).divideby((tri_mat[mat_i][mat_i]))
                        for (var mat_k in tri_mat[mat_j]){
                            var result = tri_mat[mat_j][mat_k].minus(coefficient.times(operand[mat_k]))
                            tri_mat[mat_j][mat_k] = result
                        }
                    }
                }
            }
            tri_mat = new Matrix(tri_mat)
            var determinant = new Fraction(1)
            tri_mat.diagonal.forEach(element=>{determinant = determinant.times(element)})
            this.determinant = determinant
        }
    }
    // ----------------------------------------------------------------------
    // COFACTOR
    // ----------------------------------------------------------------------
    cofactor(){
        if (!this.issquare){
            document.write("Not  square matrix")
            return
        }
        if (this.rowsSize==1)
            return this
        var cof_mat_n = this.rowsSize
        var cofactor = []
        var cof_mat_mm = 0
        for(var mat_i=0; mat_i<cof_mat_n; mat_i++){
            cofactor.push([])
            for(var mat_j=0; mat_j<cof_mat_n; mat_j++){
                var minor = []
                var count = -1
                for(var mat_k=0; mat_k<cof_mat_n; mat_k++){
                    if (mat_i != mat_k){
                        minor.push([])
                        count++
                        for(var mat_m=0; mat_m<cof_mat_n; mat_m++){
                            if (mat_j != mat_m)
                                minor[count].push(this.rows[mat_k][mat_m])
                        }
                    }
                }
                
                minor = new Matrix(minor)
                var times = (-1)**((mat_i)+(mat_j))
                minor.find_determinant()
                if (!minor.determinant){
                    document.write("<br>Can not find the cofactor of this matrix<br>")
                    return
                }
                var cof = minor.determinant
                cofactor[mat_i].push(cof.times(times))
            }
        }
        return new Matrix(cofactor)
    }
    inverse(){
        if (!this.determinant)
            this.find_determinant()
        if (this.determinant.numerator == 0){
            document.write("The given matrix is invertible")
            return
        }
        if (this.rowsSize ==1){
            return new Matrix([[this.rows[0][0].divides(1)]])
        }
        var inv = this.determinant.inverse()
        var inv_mat = []
        if (!this.cofactor())
            return
        var cofactor = this.cofactor().transpose()
        for (var inv_mat_i in cofactor.rows){
            inv_mat.push([])
            cofactor.rows[inv_mat_i].forEach(inv_element => {
                var elem = inv.times(inv_element)
                inv_mat[inv_mat_i].push(elem)
            });
        }
        return new Matrix(inv_mat)
    }
    //scalar multiplication
    // scalar_mult(operand){
    //     var mat_result = []
    //     this.rows.forEach(sm_mat_i => {
    //         mat_result.push([])
    //         sm_mat_i.forEach(sm_mat_j => {
    //             sm_mat_j = sm_mat_j.times(operand)
    //             mat_result[this.rows.indexOf(sm_mat_i)].push(sm_mat_j)
    //         });
    //     });
    //     return new Matrix(mat_result)
    // }
    //Molulo division
    mod(operand){
        var mod_mat_result = []
        for (var mod_mat_i in this.rows){
            mod_mat_result.push([])
            this.rows[mod_mat_i].forEach(mod_mat_j => {
                mod_mat_result[mod_mat_i].push(mod_mat_j.mod(operand))
            });
        }
        return new Matrix(mod_mat_result)
    }
}

// var mtr = new Matrix([[2]])
// mtr.show_mat()
// mtr2 = mtr.inverse()
// mtr3 = mtr2.times(mtr)
// mtr3.show_mat()