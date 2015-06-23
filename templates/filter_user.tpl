{include file="header.tpl"}

<script type="text/javascript" src="libs/main.js"></script>
<script type="text/javascript" src="libs/filter_user.js"></script>



<div class="row">
  <div class="col-md-1">&nbsp;</div>
  <div class="col-md-10">
      <div width="100%" style="text-align: right">logined as {$user_name}</div>
      <h3>VK_getRetarget. Filter Users </h3>

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
                    <label for="user_ids">id Group</label>
                    <!--input type="text" class="form-control" name="id_group"  value="ufamama"-->
                    <textarea class="form-control" rows="7" name="user_ids">10923542

                    </textarea>
                </div>
            </div>

            <div class="row">
                <div class="form-group col-md-1">
                    <label for="city_id">City_id</label>
                    <input type="text" class="form-control" name="city_id" value="151">
                </div>

                <div class="form-group col-md-1">
                    <label for="sex">Sex</label>
                    <input type="text" class="form-control" name="sex" value="1">
                </div>

                <div class="form-group col-md-2">
                    <label for="age_from">age_from</label>
                    <input type="text" class="form-control" name="age_from" value="18">
                </div>

                <div class="form-group col-md-2">
                    <label for="age_to">age_to</label>
                    <input type="text" class="form-control" name="age_to" value="28">
                </div>

                <div class="form-group col-md-2">
                    <label for="last_seen">last_seen (days)</label>
                    <input type="text" class="form-control" name="last_seen" value="3">
                </div>

                <!--div class="form-group col-md-4">
                    <div class="checkbox">
                        <label><input type="checkbox" name="is_on"> On/Off</label>
                    </div>
                </div-->
            </div>


            <div class="row">
                <div class="col-md-2 col-md-offset-4">
                    <a class="btn btn-success col-md-12" name="filter"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span> Filter</a>
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
        <div name="countdown_groups"></div>
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




