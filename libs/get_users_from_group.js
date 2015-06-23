if (typeof GObj.users == 'undefined')  {GObj.users   = {};}

$(document).ready(function()
{

});








//============================================================================================
// getGroups
$(function()
{
    $('[name=params]')
        .on('click','form [name=ok]',function()
        {
            var self = $(this);
            var sex  = $('[name=params] [name=sex]').val();
            var city = $('[name=params] [name=city_id]').val();
            var age_from    = $('[name=params] [name=age_from]').val();
            var age_to      = $('[name=params] [name=age_to]').val();
            var last_seen   = $('[name=params] [name=last_seen]').val()*1;
            var entrance    = $('[name=params] [name=entrance]').val()*1;
            var relation_exclude      = $('[name=params] form [name=relation_exclude]').val().split(',');


            var id_group_t = $('[name=params] form [name=id_group]').val().split('\n');
            var arr_id_group = {};
            var i = 0;
            $.each(id_group_t, function(index, v) {
                var group_id_m = v.replace(/[^0-9]/gim,'');
                //log(group_id_m);
                if (group_id_m != '' && group_id_m != undefined ) {i++; arr_id_group[i] = group_id_m;}
            });
            //log(arr_id_group);

            var num_groups = csobjlen(arr_id_group);
            //log(num_groups);return false;


            self.addClass('loader');

            delay_ind = 0;
            $.each(arr_id_group, function(index, id_group) {


                groups_getMembers(id_group, function (data) {
                    var users = data;
                    delete (data);

                    log('==================================');
                    log(id_group);
                    log(csobjlen(users));

                    if (csobjlen(users) > 0) {

                        $.each(users, function (index, v) {

                            users[index]['count_group'] = 1;

                            if (sex != v['sex'] && sex != 0) {delete (users[index]);}

                            if (city != v['city'] && city != 0 && typeof v['city'] != 'undefined') {delete (users[index]);}


                            if (typeof v['bdate'] != 'undefined' && v['bdate'].length >= 8) {

                                var date_bdate = moment(v['bdate'], "DD.MM.YYYY");
                                    date_bdate = date_bdate['_d'];
                                var date_from = (moment().subtract(age_from, 'Y'));
                                    date_from = date_from['_d'];
                                var date_to = (moment().subtract(age_to, 'Y'));
                                    date_to = date_to['_d'];
                                if (date_bdate <= date_from || date_bdate >= date_to) { delete (users[index]); }

                            }


                            if (typeof v['last_seen'] != 'undefined') {

                                var date_last_seen = moment.unix(v['last_seen']['time']);
                                date_last_seen = date_last_seen['_d'];
                                //log(date_last_seen);

                                var date_to = (moment().subtract(last_seen, 'days'));
                                date_to = date_to['_d'];
                                //log(date_to)

                                if (date_last_seen < date_to) { delete (users[index]); }

                            }

                            if (typeof v['deactivated'] != 'undefined') {delete (users[index]);}



                            if (typeof v['relation'] != 'undefined' && v['relation'] != '' && $.inArray( v['relation']+'', relation_exclude ) != -1) {delete (users[index]);}




                            if (typeof users[index] != 'undefined'){

                                if (typeof GObj.users[index] == 'undefined'){
                                    GObj.users[index] = users[index]['count_group'];
                                }
                                else { GObj.users[index]++; }
                            }
                        });
                        delete (users);
                    }



                    num_groups--;
                    //log(num_groups);
                    $('[name=info_block] [name=countdown_groups]').text('Осталось обработать групп: '+num_groups);

                    if (num_groups == 0){

                        $.each(GObj.users, function(index, v) {
                            if (v < entrance){ delete (GObj.users[index]);}
                        });

                        $('[name=info_block] [name=info]').text('Найдено контактов: '+csobjlen(GObj.users));
                        var data_src = {datas: JSON.stringify(GObj.users), filename:'users'}
                        csAjax(data_src, 'json_lib__save2csv.php', function(data) {
                            window.location.replace(data.filename);
                            self.removeClass('loader');
                        });

                    }
                    //if (num_groups == 1){log(arr_id_group);}
                });



            });
        });
});
//============================================================================================


