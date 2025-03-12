const output_lg = document.getElementById("output-lg");
const output_sm = document.getElementById("output-sm");
var cipher = "des";
var encoder = new TextEncoder();
var decoder = new TextDecoder();
var binary_output = "";
var text_output = "";
var output_mode = "binary";
var recent_operation = "encryption";
function des() {
  cipher = "des";
}
function aes() {
  cipher = "aes";
}
function encrypt() {
  var key = document.getElementById("key").value;
  var plain_text = document.getElementById("text-area").value;

  key = encoder.encode(key);
  var input_key = "";
  key.forEach((element) => {
    input_key += element.toString(2).padStart(8, "0");
  });
  input_key = input_key.padStart(56, "0").slice(0, 56);
  var keys = makeKey(input_key, 16);

  plain_text = encoder.encode(plain_text);
  var input = "";
  plain_text.forEach((element) => {
    input += element.toString(2).padStart(8, "0");
  });
  input = input.padStart(64, "0");
  var cipher_text = DES(input, keys);
  var cipher = [];
  for (i = 0; i < cipher_text.length / 8; i++) {
    cipher.push(cipher_text.slice(i * 8, (i + 1) * 8));
  }
  cipher = cipher.map((element) => {
    return parseInt(element, 2);
  });
  cipher = new Uint8Array(cipher);
  text_output = decoder.decode(cipher);

  // text_output = cipher;
  binary_output = cipher_text;

  var output_text = output_mode == "binary" ? binary_output : text_output;
  output_lg.innerHTML = output_text;
  output_sm.innerHTML = output_text;
  recent_operation = "encryption";
}

function decrypt() {
  var key = document.getElementById("key").value;
  var input = document.getElementById("text-area").value;

  var invalid_input = false;
  for (i in input) {
    if ((input[i] != "1") & (input[i] != 0)) {
      invalid_input = true;
      break;
    }
  }
  if (input.length % 64 != 0) {
    invalid_input = true;
  }

  if (invalid_input) {
    output_lg.innerHTML = "Invalid cipher!";
    output_sm.innerHTML = "Invalid cipher!";
    return;
  }
  key = encoder.encode(key);
  var input_key = "";
  key.forEach((element) => {
    input_key += element.toString(2).padStart(8, "0");
  });
  input_key = input_key.padStart(56, "0").slice(0, 56);
  var keys = makeKey(input_key, 16);

  // input = encoder.encode(input);
  // var cipher = "";
  // input.forEach((element) => {
  //   cipher += element.toString(2).padStart(8, "0");
  // });
  var plain = DES(input, keys.reverse());
  var plain_text = [];
  for (i = 0; i < plain.length / 8; i++) {
    if (parseInt(plain.slice(i * 8, (i + 1) * 8), 2) != 0)
      plain_text.push(parseInt(plain.slice(i * 8, (i + 1) * 8), 2));
  }
  plain_text = new Uint8Array(plain_text);
  plain_text = decoder.decode(plain_text);
  var output_text = plain_text;
  output_lg.innerHTML = output_text;
  output_sm.innerHTML = output_text;
  recent_operation = "decryption";
}
function view_mode(mode) {
  output_mode = mode == "text" ? "text" : "binary";
  if (recent_operation == "decryption") return;
  output_lg.innerHTML = mode == "text" ? text_output : binary_output;
}