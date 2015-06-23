{include file="header.tpl"}

<br /><br /><br />



<div class="row">
  <div class="col-md-2">&nbsp;</div>
  <div class="col-md-7">
  <h3>Yandex.Метрика - Логин</h3>
      <div class="alert alert-danger alert-dismissible" role="alert" {if !$error}style="display: none;"{/if}>
          <span {if !$error}style="display: none;"{/if}><strong>Error!</strong> {$error.error_msg}</span>
      </div>

   <FORM ENCTYPE="multipart/form-data" action="login.php" METHOD="POST" class="well">

                <div class="row">
                    <div class="form-group col-md-4">
                        <label>Логин (как в админке)</label>
                        <input class="form-control" type="text" name="login">
                    </div>
                    <div class="form-group col-md-4">
                        <label>Пароль</label>
                        <input class="form-control" type="password" name="password">
                    </div>
                    <div class="col-md-2">&nbsp;</div>
                </div>


            <INPUT type="submit" value="Войти"  class="btn btn-primary">

   <FORM>
  </div>
  <div class="col-md-1">&nbsp;</div>
</div>





{include file="footer.tpl"}





