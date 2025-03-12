var matrix_size = 3;
var rail_size = 9;
var depth;
function put_key() {
    const cipher = document.getElementById("cipher");
    const key = document.getElementById("key");
    switch (cipher.value) {
        case "caeser":
            var key_input =
                '<label for="key-input" class="form-label">Key</label>';
            key_input +=
                '<select id="key-input" class="form-control" style="width:60px">';
            for (pki = 1; pki < 26; pki++) {
                key_input += '<option value="' + pki + '">' + pki + "</option>";
            }
            key_input += "</select>";
            key.innerHTML = key_input;
            break;
        case "hill":
            var key_input = '<div class="input-group">';
            key_input += '<span class="input-group-text">Size</span>';
            key_input +=
                '<input type="number" id="size" style="width:60px;border:none">';
            key_input +=
                '<span class"input-group-text" onclick="put_matrix()">';
            key_input +=
                '<img src="./media/icons/arrow-right-square.svg"  style="height:100%" /></span></div>';
            key_input +=
                '<div id="matrix" style="overflow-x:scroll;overflow-y:scroll;height:155px">';
            for (row = 0; row < 3; row++) {
                key_input += '<div class="d-flex">';
                for (column = 0; column < 3; column++) {
                key_input +=
                    '<input type="number" class="m-1" style="width:52px" id="item' +
                    row +
                    column +
                    '">';
                }
                key_input += "</div>";
            }
            key_input += "</div>";
            key.innerHTML = key_input;
            break;
        case "rail-fence":
            var key_input =
                '<div><label for="depth" class="form-label">Depth</label>';
            key_input +=
                '<input type="radio" id="depth" onclick="rail_depth()" class="mx-2 d-inline form-control" style="width:8px">';
            key_input += '<label for="rail-key" class="form-label">Key</label>';
            key_input +=
                '<input type="radio" id="rail-key" onclick="rail_key()" class="mx-2 d-inline form-control" style="width:8px"></div>';
            key_input += '<div id="rail-key-input">';
            key_input +=
                '<label for="key-input" class="form-label">Key</label><input type="number" id="key-input" min="0" class="form-control" style="width:100px">';
            key.innerHTML = key_input + "</div>";
            depth = true;
            break;
        default:
            key.innerHTML = '<label for="key-input" class="form-label">Key</label><input type="text" id="key-input" class="form-control">';
    }
}

function rail_depth() {
    const key = document.getElementById("rail-key-input");
    key.innerHTML =
      '<label for="key-input" class="form-label">Key</label><input type="number" id="key-input" min="0" class="form-control" style="width:100px">';
    depth = true;
}

function rail_key() {
    const key = document.getElementById("rail-key-input");
    var key_input = '<div class="input-group">';
    key_input += '<span for="size" class="input-group-text">Size</span>';
    key_input +=
      '<input type="number" id="size" min="0" class="form-control">';
    key_input += '<span class="input-group-text" onclick="rail_put_key()">';
    key_input +=
      '<img src="./media/icons/arrow-right-square.svg" style="height:100%"></span></div>';
    key_input +=
      '<div id="key-list" style="overflow-x:scroll;overflow-y:scroll;height:140px">';
    for (rki = 0; rki < 9; rki++) {
      key_input +=
        '<input type="number" min="0" class="m-1" style="width:52px" id="item' +
        rki +
        '">';
    }
    key.innerHTML = key_input;
    depth = false;
}

function rail_put_key() {
    rail_size = document.getElementById("size").value;
    const key_list = document.getElementById("key-list");
    var key_input = "";
    for (rki = 0; rki < rail_size; rki++) {
      key_input +=
        '<input type="number" min="0" class="m-1" style="width:52px" id="item' +
        rki +
        '">';
    }
    key_list.innerHTML = key_input;
}

function put_matrix() {
    const matrix_field = document.getElementById("matrix");
    matrix_size = document.getElementById("size").value;
    var key_input = "";
    for (row = 0; row < matrix_size; row++) {
      key_input += '<div class="d-flex">';
      for (column = 0; column < matrix_size; column++) {
        key_input +=
          '<input type="number" class="m-1" style="width:52px" id="item' +
          row +
          column +
          '">';
      }
      key_input += "</div>";
    }
    matrix_field.innerHTML = key_input;
}
const output = document.getElementById("output");
const output_sm = document.getElementById("output-sm");

function encrypt() {
    var key = document.getElementById("key-input");
    const input = document.getElementById("text-area");

    switch (cipher.value) {
      case "caeser":
        var ciptxt = caeser_encrypt(input.value, Number(key.value));
        break;
      case "vigenere":
        key = vigenere_makeKey(key.value);
        if (key) {
          var ciptxt = vigenere_encrypt(input.value, key);
        } else {
          var ciptxt = "Please provide a valid key";
        }
        if (!input.value) {
          ciptxt = "Empty plain text";
        }
        break;
      case "play-fair":
        key = playFair_makeKey(key.value);
        var ciptxt = playFair_encrypt(input.value, key);
        ciptxt = !input.value ? "Empty plain text" : ciptxt;
        break;
      case "rail-fence":
        if (depth) {
          var ciptxt = key.value
            ? rail_encrypt(input.value, key.value)
            : "Please provide a valid key";
          ciptxt = !input.value ? "Empty plain text!" : ciptxt;
        } else {
          var item;
          var key_list = [];
          for (element = 0; element < rail_size; element++) {
            item = document.getElementById("item" + element);
            if (!item.value) {
              output.innerHTML = "Incomplete key";
              output_sm.innerHTML = "Incomplete key";
              return;
            }
            key_list.push(item.value);
            var comparisor = [];
            key_list.forEach((element) => {
              comparisor.push(element);
            });
            comparisor.sort((a, b) => a - b);
            var consecutive = comparisor.every((element1, element2) => {
              return element1 == element2 + 1;
            });
          }
          var ciptxt = consecutive
            ? rail_encrypt(input.value, null, key_list)
            : "Invalid key";
          ciptxt = !input.value ? "Empty plain text" : ciptxt;
        }
        break;
      default:
        var element;
        var lst = [];
        for (row = 0; row < matrix_size; row++) {
          lst.push([]);
          for (column = 0; column < matrix_size; column++) {
            element = document.getElementById("item" + row + column);
            if (!element.value) {
              output.innerHTML = "Incomplete key";
              output_sm.innerHTML = "Incomplete key";
              return;
            }
            lst[row].push(element.value);
          }
        }
        key = new Matrix(lst);
        key.find_determinant();
        if (gcd(key.determinant.mod(26).value, 26) != 1 && !ignore) {
          var ciptxt =
            '<div class="col-10 bg-light mt-5 rounded" style="height:200px">';
          ciptxt += '<div class="row justify-content-center py-5">';
          ciptxt +=
            '<h6 class="col-12 text-danger text-center">This key can not be used for decryption</h6>';
          ciptxt +=
            '<p class="col-12 text-center">Do you wish to continue?</p>';
          ciptxt +=
            '<div class="col-4"><button type="button" class="btn btn-dark" style="width:100%" onclick="yes()">Yes</button></div>';
          ciptxt +=
            '<div class="col-4"><button type="button" class="btn btn-dark" style="width:100%" onclick="no()">No</button>';
          ciptxt += "</div></div></div>";
        } else {
          if (reply) var ciptxt = hill_encrypt(input.value, key);
          else var ciptxt = "The output will be shown here";
        }
    }
    output.innerHTML = ciptxt;
    output_sm.innerHTML = ciptxt;
}

var reply = true;
var ignore = false;
function yes() {
    ignore = true;
    encrypt();
    ignore = false;
}
function no() {
    reply = false;
    ignore = true;
    encrypt();
    ignore = false;
    reply = true;
}

function decrypt() {
    var key = document.getElementById("key-input");
    const input = document.getElementById("text-area");
    switch (cipher.value) {
      case "caeser":
        var plntxt = caeser_decrypt(input.value, Number(key.value));
        break;
      case "vigenere":
        key = vigenere_makeKey(key.value);
        if (key) {
          var plntxt = vigenere_decrypt(input.value, key);
        } else {
          var plntxt = "Please provide a valid key";
        }
        break;
      case "play-fair":
        key = playFair_makeKey(key.value);
        var plntxt = playFair_decrypt(input.value, key);
        break;
      case "rail-fence":
        if (depth) {
          var plntxt = key.value
            ? rail_decrypt(input.value, key.value)
            : "Please provide a valid key";
          plntxt = !input.value ? "Empty plain text!" : plntxt;
        } else {
          var item;
          var key_list = [];
          for (element = 0; element < rail_size; element++) {
            item = document.getElementById("item" + element);
            if (!item.value) {
              output.innerHTML = "Incomplete key";
              output_sm.innerHTML = "Incomplete key";
              return;
            }
            key_list.push(item.value);
            var comparisor = [];
            key_list.forEach((element) => {
              comparisor.push(element);
            });
            comparisor.sort((a, b) => a - b);
            var consecutive = comparisor.every((element1, element2) => {
              return element1 == element2 + 1;
            });
          }
          var plntxt = consecutive
            ? rail_decrypt(input.value, null, key_list)
            : "Invalid key";
          plntxt = !input.value ? "Empty plain text" : plntxt;
        }
        break;
      default:
        var element;
        var lst = [];
        for (row = 0; row < matrix_size; row++) {
          lst.push([]);
          for (column = 0; column < matrix_size; column++) {
            element = document.getElementById("item" + row + column);
            if (!element.value) {
              output.innerHTML = "Incomplete key";
              output_sm.innerHTML = "Incomplete key";
              return;
            }
            lst[row].push(element.value);
          }
        }
        key = new Matrix(lst);
        key.find_determinant();
        if (gcd(key.determinant.mod(26).value, 26) != 1) {
          var plntxt = "This key can not be used for decryption";
        } else {
          var plntxt = hill_decrypt(input.value, key);
        }
    }
    output.innerHTML = plntxt;
    output_sm.innerHTML = plntxt;
}