{include file="header.tpl"}

<script type="text/javascript" src="libs/main.js"></script>
<script type="text/javascript" src="libs/groups_invite.js"></script>



<div class="row">
  <div class="col-md-1">&nbsp;</div>
  <div class="col-md-10">
      <div width="100%" style="text-align: right">logined as {$user_name}</div>
      <h3>VK_getRetarget. Invite Users to Group </h3>

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
            <div class="row">
                <div class="form-group col-md-12">
                    <label for="ids_users">id users</label>
                    <!--input type="text" class="form-control" name="id_group"  value="ufamama"-->
                    <textarea class="form-control" rows="7" name="ids_users">
                        urgavega
                        303044262
                        173623377
                    </textarea>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-3">
                    <label for="group_id">group_id</label>
                    <input type="text" class="form-control" name="group_id" value="50065496">
                </div>
            </div>


            <div class="row">
                <div class="col-md-2 col-md-offset-4" style="text-align: right;">
                    <a class="btn btn-primary col-md-12" name="ok" >Ok</a>
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


<hr>

<div class="row" name="get_users_from_group_list" style="display: none;">
    <div class="col-md-1">&nbsp;</div>
    <div class="col-md-10">

        <div name="title_table" style="font-weight: bold;">Groups</div>
        <table name="table_list_get_users_from_group" class="table table-striped" style="width: 800px;" border="0">
            <tbody>
                <tr style="display: none;" name="template_tr" id="{literal}{id}{/literal}">
                    <td style="vertical-align: middle; color: black; font-size: 12px; font-weight: bold;" width="250">
                        <a href="http://vk.com/{literal}{screen_name}{/literal}" target="_blank">{literal}{name}{/literal}</a>
                        <div name="activity" style="color: #808080; font-size: 10px; font-weight: normal;">{literal}{activity}{/literal}</div>
                        <div>Подписчиков: {literal}{members_count}{/literal}</div>
                    </td>
                    <td style="vertical-align: middle; color: #9D9D9D; font-size: 12px;"  width="1" >
                        <button data-id="{literal}{id}{/literal}" class="btn btn-danger"    name="remove" ><span class="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="col-md-1">&nbsp;</div>
</div>



{include file="footer.tpl"}





