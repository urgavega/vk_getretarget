var url=(window.location)+'';
var url_pos = url.indexOf('localhost');
var delay_ind = 0;

if (url.indexOf('localhost') > 0)
  {var url_main_domain = 'http://localhost/vk_getretarget/';}
else
  {var url_main_domain = '';}


if (typeof GObj == 'undefined')  {var GObj   = {};}





function log(data){ console.log(data) }

function csobjlen(data){return  (Object.keys(data).length);}




// ajax************ **************************************************************************
//============================================================================================
// ajax.

function csAjax(data_src, url, callback)
{
    if (typeof gloader != 'undefined')  {gloader.addClass('loader');}

    //log(data_src);
    //return;
    $.ajax(
        {
            async: false,
            url : url_main_domain+url,
            type: 'post',
            data: (data_src),
            jsonp: 'callback',
            //jsonpCallback: 'callbackName',
            dataType:'jsonp',
            success: function (data)
            {
                if (typeof gloader != 'undefined')  {gloader.removeClass('loader'); delete (gloader);}
                var response = data;
                callback.call(this, response);
            },
            error: function (data)
            {
                log('error');
                if (typeof gloader != 'undefined')
                    {
                        gloader.removeClass('loader');
                        delete (gloader);
                    }
            }
        });
}
// ajax.
//============================================================================================




function ajaxFileUpload(file_name, btn, ajax_fileupload_handler, fileElementId,data_src, callback)
{

    //var fileName = $("#fileToUpload").val();

    var arr_path = file_name.split("\\");
    file_name    = arr_path[(arr_path.length-1)]
    var file_name_check  = file_name.replace(/[^\d\w_.]/g, '');


    if (file_name != file_name_check)
    {alert('Error: The name can contain only Latin letters and figures!'); return false;}

    btn.addClass('loader');


    jQuery.ajaxFileUpload
    (
        {
            url:           ajax_fileupload_handler,
            secureuri:     false,
            fileElementId: fileElementId,
            data:          data_src,
            dataType:      'json',
            success: function (data, status)
            {
                if(data.code == 0)
                {alert('Error: '+data.error+'. File NOT uploaded!');}
                else
                {
                    var response = data;
                    callback.call(this, response);
                }
                btn.removeClass('loader');
            },
            error: function (data, status, e)
            {
                alert(e);
                btn.removeClass('loader');
            }
        }
    )

    return false;

}













if (typeof GObj.logdata == 'undefined')
{
    var data_src = {};

    csAjax(data_src, 'json_lib__get_token.php', function(data) {
        GObj.logdata   = data;
        //log(GObj);
    });
}




// ======================================= VK ========================================

// ajax.
function vkAjax(data_src,callback)
{
    var url = 'https://api.vk.com/method/'+data_src.method;
        delete (data_src.method);

    data_src.access_token = GObj.logdata.vk_token;

    //if (typeof loader != 'undefined')  {loader.addClass('loader'); }
    delay_ind++;
    setTimeout(function(){
    $.ajax(
        {
            //async: false,
            url : url,
            type: 'get',
            data: (data_src),
            jsonp: 'callback',
            //jsonpCallback: 'callbackName',
            dataType:'jsonp',
            success: function (data)
            {
                //if (typeof loader != 'undefined')  {loader.removeClass('loader'); }
                var response = data;
                callback.call(this, response);
            },
            error: function (data)
            {
                log('error');
                //if (typeof loader != 'undefined'){ loader.removeClass('loader'); }
            }
        });},500*delay_ind);
}
// ajax.




// ajax.
function vkAjax_notoken(data_src,callback)
{
    var url = 'https://api.vk.com/method/'+data_src.method;
    delete (data_src.method);


        $.ajax(
            {
                //async: false,
                url : url,
                type: 'get',
                data: (data_src),
                jsonp: 'callback',
                //jsonpCallback: 'callbackName',
                dataType:'jsonp',
                success: function (data)
                {
                    //if (typeof loader != 'undefined')  {loader.removeClass('loader'); }
                    var response = data;
                    callback.call(this, response);
                },
                error: function (data)
                {
                    log('error');
                    //if (typeof loader != 'undefined'){ loader.removeClass('loader'); }
                }
            });
}
// ajax.



function groups_getById (group_id, callback)
{
    var data_src = {
        method:     'groups.getById',
        group_id:   group_id,
        fields:     'members_count'
    }

    vkAjax_notoken(data_src, function(data)
    {
        //log(group_id);
        //log(data);
        //return false;
        if (typeof data.error == 'undefined'){

            if (typeof data.response[0]['members_count'] == 'undefined'){data.response[0]['members_count'] = 0;}

            var response = data.response[0];
            callback.call(this, response);
        }
        else {

            var response = {members_count: 0};
            callback.call(this, response);
        }


    });

    return;
}






function groups_getMembers (group_id, callback)
{
    var users = {};
    var iteration = 0;
    var gid = 0;

    groups_getById (group_id, function(data){

        //log(data.members_count);
        if (data.members_count == 0){callback.call(this, ''); return false;}

        iteration = Math.ceil(data.members_count / 1000);

        gid = data.gid;
        //log(data);return false;
        for (i = 0; i < iteration; i++)
        {
            var data_src = {
                method:     'groups.getMembers',
                group_id:   gid,
                fields:     'city,country,sex,last_seen,bdate,relation',
                offset:     i*1000,
                count:      1000
            }
            //log(data_src);return false;

            vkAjax_notoken(data_src, function(data)
            {
                if (typeof data.error == 'undefined') {

                    //log(data.response.users.length);
                    if (data.response.users.length > 0) {

                        $.each(data.response.users, function(index, v){
                            //log(v);
                            users[v.uid] = v;
                        });
                        iteration--;

                        if (iteration == 0){
                            var response = users;
                            callback.call(this, response);
                        }
                    }
                    else
                    {callback.call(this, 0);}
                }
            });
        }
    });
}







function groups_search (q, city_id, callback)
{
    var groups = {};

            var data_src = {
                method:     'groups.search',
                v:          '5.19',
                q:   q,
                offset:     0,
                count:      1000,
                fields:     'members_count,contacts',
                city_id:    city_id
            }
            //log(data_src);//return false;



    vkAjax(data_src, function(data)
            {
                if (typeof data.error == 'undefined') {


                    if (data.response.count > 0) {

                        //delete (data.response[0]);

                        $.each(data.response.items, function(index, v){
                            //log(v);
                            groups[v.id] = v;
                        });

                         var response = groups;
                         callback.call(this, response);

                    }
                    else
                    {
                        callback.call(this, 0);
                    }
                }
            });
}







function users_get (user_ids, callback)
{
    var users = {};

    var data_src = {
        method:     'users.get',
        v:          '5.8',
        name_case:  'Nom',
        user_ids:   user_ids,
        //fields:     'sex,bdate,city,country,last_seen,relation,relatives,maiden_name,nickname'
        fields:     'sex,bdate,city,country,last_seen,relation,relatives,counters'
    }
    //log(data_src);//return false;



    vkAjax(data_src, function(data)
    {
        if (typeof data.error == 'undefined') {

           log(data.response);return false;

            if (csobjlen(data.response) > 0) {

                $.each(data.response, function(index, v){ users[v.id] = v; });

                var response = users;
                callback.call(this, response);
            }
            else
            {callback.call(this, 0);}
        }
    });
}






function groups_invite (user_id, group_id, callback)
{
    var data_src = {
        method:     'groups.invite',
        v:          '5.32',
        user_id:    user_id,
        group_id:   group_id
    }


    vkAjax(data_src, function(data)
    {
        if (typeof data.error == 'undefined') {
                var response = data.response;
                callback.call(this, response);
        }
        else
        {
            log(data);
            var response = 0;
            callback.call(this, response);
        }
    });
}






function friends_get (user_id, callback)
{
    var users = {};

            var data_src = {
                method:    'friends.get',
                user_id:   user_id,
                fields:    'city,country,sex,last_seen,bdate,relation',
                v:         '5.32'
            }

            vkAjax(data_src, function(data)
            {
                if (typeof data.error == 'undefined') {

                    //log(data.response.count); return false;
                    if (data.response.count > 0) {

                        $.each(data.response.items, function(index, v){
                            //log(v);return false;
                            if (typeof v['city'] == 'undefined'){v['city'] = {}; v['city']['id'] = 0;}
                            users[v.id] = v;
                        });

                            var response = users;
                            callback.call(this, response);
                    }
                    else {
                        callback.call(this, 0);
                    }
                }
                else
                {
                    log(data);
                    callback.call(this, 0);
                }

            });


}

