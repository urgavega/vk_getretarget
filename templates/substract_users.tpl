{include file="header.tpl"}
<script type="text/javascript" src="libs/ajaxfileupload.js"></script>

<script type="text/javascript" src="libs/main.js"></script>
<script type="text/javascript" src="libs/substract_users.js"></script>



<div class="row">
  <div class="col-md-1">&nbsp;</div>
  <div class="col-md-10">
      <div width="100%" style="text-align: right">logined as {$user_name}</div>
      <h3>VK_getRetarget. Substract users </h3>

        <div class="alert alert-danger alert-dismissible" role="alert" {if !$error}style="display: none;"{/if}>
          <span {if !$error}style="display: none;"{/if}><strong>Error!</strong> {$error.error_msg}</span>
        </div>

  </div>
  <div class="col-md-1">&nbsp;</div>
</div>




<div class="row" name="params">
    <div class="col-md-1">&nbsp;</div>
    <div class="col-md-10">
        <h4 name="user_edit__title">Parameters</h4>
        <FORM ENCTYPE="multipart/form-data" action="" METHOD="POST" class="well">

            <div class="row" name="import_cont">
                <div class="form-group col-md-3" style="1display: none;">
                    <input type="file" id="fileupload_users_import" name="fileupload">
                </div>

                <div class="form-group col-md-3" style="1display: none;">
                    <a class="btn btn-default" name="btn_fileupload_users_import">Upload CSV to server</a>
                </div>

            </div>
            <FORM>
    </div>
    <div class="col-md-1">&nbsp;</div>

</div>

<div class="row" name="info_block" style="1display: 1none;">
    <div class="col-md-1">&nbsp;</div>
    <div class="col-md-10">
        <div name="info"></div>
        <div name="countdown_users"></div>
    </div>
    <div class="col-md-1">&nbsp;</div>
</div>




{include file="footer.tpl"}





