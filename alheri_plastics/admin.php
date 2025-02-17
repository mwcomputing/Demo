<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alheri Plastics</title>
    <link rel="stylesheet" href="./media/CSS/bootstrap.min.css" />
  </head>
  <body>
    <nav class="navbar navbar-expand pb-3" style="height: 10vh">
      <div class="container-fluid">
        <span class="navbar-brand ms-2 me-5" href="#">Alheri Plastics</span>
        <button
          class="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto ps-5 ps-md-0">
            <li class="nav-item">
              <a class="nav-link" href="orders.php">Orders</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="upload.php">Upload</a>
            </li>
          </ul>
          <form class="d-none d-md-flex w-100 px-5" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search for product"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>

    <div class="container-fulid">
      <form class="d-flex d-md-none w-100 px-4" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search for product"
          aria-label="Search"
        />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
      <div class="row mt-3 justify-content-center ps-2" style="width: 100vw" id="content">
      <?php

            // CONNECTING TO THE DATABASE
            $host = "localhost";
            $database = "alheri_plastics";
            $username = "root";
            $password = "";
            $conn = mysqli_connect($host, $username, $password, $database);

            // RETRIEVING DATA FROM THE DATABASE
            $sql = "SELECT name, price, quantity, image FROM products";
            $result  = mysqli_query($conn, $sql);
            if (mysqli_num_rows($result)){
                while ($row = mysqli_fetch_assoc($result)){
                    echo '<div class="col-6 col-md-2 d-flex gap-4 my-3 my-md-0">
                            <div class="card">
                            <div class="card-body">
                            <img src="./media/images/'. $row['image'] . '" alt="" style="height:150px;width:150px;"/>
                            <div class="card-text text-center">' . $row['name'] . '</div>
                            <div class="card-text text-center">' . "N" . $row['price'] . " - " . $row['quantity'] . " Pcs Left" . '</div>
                            </div>
                            <div class="btn-group" role="group">
                            <a class="btn btn-outline-secondary px-4 text-decoration-none" href="#">Edit</a>
                            <a class="btn btn-outline-danger text-decoration-none" href="#">Delete</a>
                            </div></div></div>';
                }
            };
            // echo "Done succefully";

        ?>
      </div>
    </div>
    <script src="./media/JS/bootstrap.bundle.js"></script>
  </body>

