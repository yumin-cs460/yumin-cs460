
        var query = window.location.search.substring(1);

        function findID(id)
        {
           if(Boolean(id)){
             var sub = query.split('=');
             console.log(sub[1]);
             jump(sub[1]);
           }
        }

        function jump(h)
        {
            var top = document.getElementById(h).offsetTop;
            window.scrollTo(0,top);
        }
        findID(query);

