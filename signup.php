<?php
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../controller/traitement.php';
$cnx = getConnection(); $message = "";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = ['nom' => $_POST['nom'], 'email' => $_POST['email'], 'password' => $_POST['password']];
    $message = AddUser($cnx, $data) ? "User added successfully!" : "Error adding user.";
}
?>
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Sign Up</title>
<link rel="stylesheet" href="style.css"></head><body>
<div class="container"><h2>Sign Up</h2>
<?php if ($message): ?><p class="message"><?= htmlspecialchars($message) ?></p><?php endif; ?>
<form method="POST" action="">
  <label>Name</label><input type="text" name="nom" required>
  <label>Email</label><input type="email" name="email" required>
  <label>Password</label><input type="password" name="password" required>
  <button type="submit">Register</button>
</form>
<a href="user_list.php">View All Users</a></div></body></html>
