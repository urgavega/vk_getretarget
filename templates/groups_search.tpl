{include file="header.tpl"}

<script type="text/javascript" src="libs/main.js"></script>
<script type="text/javascript" src="libs/groups_search.js"></script>



<div class="row">
  <div class="col-md-1">&nbsp;</div>
  <div class="col-md-10">
      <div width="100%" style="text-align: right">logined as {$user_name}</div>
      <h3>VK_getRetarget. Groups Search</h3>

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
                    <label for="q">Query</label>
                    <!--input type="text" class="form-control" name="id_group"  value="ufamama"-->
                    <textarea class="form-control" rows="7" name="q">
                        свадебный фотограф
                        фотограф на свадьбу
                        флорист
                        букет на свадьбу
                        свадебный букет
                        ведущий на свадьбу
                        тамада на свадьбу
                        артист на свадьбу
                        Оформление свадьбы
                        Букет невесты
                        Постановка Свадебного танца
                        Свадебный танец
                        Выездная регистрация
                        лимузин
                        ресторан на свадьу
                        кафе на свадьбу
                        ресторан
                        кафе
                        фотограф
                        свадьб
                        свадебн
                        тамад
                        ведущи
						невест
                        свадебные прически
                        прически на свадьбу
                        свадебный макияж
                        макияж на свадьбу
                        свадебный стилист
                        макияж невесты
                        свадебный визажист
                        свадебные прически и макияж
                        визажист
                        визаж
                        стилист
                        визажист на свадьбу
                        стилист на свадьбу
                        макияж
                        прическа
                        укладка
                        ресниц
						шугаринг
						кератинов
						выпрямление
						волос
						boost up 
						прикорневой объем волос
						ламинирование
						волос		
						ногтевой
						ногти
						nail
                        
                    </textarea>
                </div>
            </div>


            <div class="row">
                <div class="form-group col-md-4">
                    <label for="city_id">City_id</label>
                    <input type="text" class="form-control" name="city_id" value="151">
                </div>

                <div class="form-group col-md-4">
                    <label for="members_count">Min Members Count</label>
                    <input type="text" class="form-control" name="members_count" value="1000">
                </div>

                <!--div class="form-group col-md-4">
                    <div class="checkbox">
                        <label><input type="checkbox" name="is_on"> On/Off</label>
                    </div>
                </div-->
            </div>


            <div class="row">
                <div class="col-md-2 col-md-offset-4" style="text-align: right;">
                    <a class="btn btn-primary col-md-12" name="ok" >Search</a>
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
        <div name="countdown_q"></div>
    </div>
    <div class="col-md-1">&nbsp;</div>
</div>



<hr>

<div class="row" name="groups_search_list" style="display: none;">
    <div class="col-md-1">&nbsp;</div>
    <div class="col-md-10">

        <div name="title_table" style="font-weight: bold;">Groups</div>
        <table name="table_list_groups_search" class="table table-striped" style="width: 800px;" border="0">
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





