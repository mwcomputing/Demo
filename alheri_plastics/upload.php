<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alheri plastics - admin</title>
    <link rel="stylesheet" href="./media/CSS/bootstrap.min.css" />
    <link rel="stylesheet" href="./media/font/bootstrap-icons.css" />
  </head>
  <body>
    <h1 style="position: fixed; top: 15px; left: 20px">
      <a class="bi bi-house-door text-black" href="admin.php"></a>
    </h1>
    <div class="container-fluid align-content-center" style="height: 100vh">
      <div class="row justify-content-center">
        <div class="col-11 col-md-4">
          <form
            class="border border-muted p-4 rounded-4 shadow"
            action="upload.php"
            method="post"
            enctype="multipart/form-data"
          >
            <label for="" class="form-label">Produt name</label>
            <input type="text" class="form-control mb-3" name="product_name" />
            <label for="" class="form-label">Cartegory</label>
            <input type="text" class="form-control mb-3" name="cartegory" />
            <label for="" class="form-label">Price tag</label>
            <input type="number" class="form-control mb-3" name="price" />
            <label for="" class="form-label">Quantity</label>
            <input type="number" class="form-control mb-3" name="quantity" />
            <input type="file" class="form-control my-3" name="file" />
            <button
              class="btn btn-dark mt-2 py-2 rounded-pill"
              style="width: 100%"
            >
              upload
            </button>
          </form>
        </div>
        <div class="col-11 col-md-4 text-center align-content-center mt-3 mt-md-0">
        <p>File Upload</p>
        <?php

            if ($_SERVER['REQUEST_METHOD'] == "POST"){
                if ($_FILES['file']['error'] != 0){
                    exit("an error occured");
                }

                // VALIDATES THE FILE TYPE
                $mime_types = ["image/png", "image/jpeg", "image/gif"];
                $finfo = new finfo(FILEINFO_MIME_TYPE);
                $mime_type = $finfo -> file($_FILES['file']['tmp_name']);
                if (! in_array($mime_type, $mime_types)){
                    exit("invalid file type");
                }

                // UPLOADS THE FILE
                $file_name = $_FILES['file']['name'];
                $image_name = __DIR__ . "\media\images\\" . $file_name;
                move_uploaded_file($_FILES['file']['tmp_name'], $image_name);
                
                // PARAMETERS
                $product_name = $_POST["product_name"];
                $cartegory = $_POST["cartegory"];
                $price = intval($_POST["price"]);
                $quantity = intval($_POST["quantity"]);

                // CONNECTING TO THE DATABASE
                $host = "localhost";
                $database = "alheri_plastics";
                $username = "root";
                $password = "";
                $conn = mysqli_connect($host, $username, $password, $database);

                // INSERTING DATA TO THE DATABASE;
                $sql = "INSERT INTO products (name, price, quantity, image, cartegory)
                        VALUE (?, ?, ?, ?, ?)";
                $stmnt = mysqli_stmt_init($conn);
                if (! mysqli_stmt_prepare($stmnt, $sql)){
                    exit("an error ocurred");
                }
                mysqli_stmt_bind_param($stmnt, "siiss", 
                                        $product_name,
                                        $price,
                                        $quantity,
                                        $file_name,
                                        $cartegory);
                mysqli_stmt_execute($stmnt);
                echo("The Product has been successfully uploaded");
            }

        ?>
        </div>
      </div>
    </div>
  </body>
</html>