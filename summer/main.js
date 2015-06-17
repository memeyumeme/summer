$(function(){
    //画像読み込み完了後に実行　　
    $(window).on('load', function(){
        //カラムのwidthを設定する
        colWidth = $('.grid').outerWidth() + offsetX *2;
        
        //最初にgridArrayを初期化
        gridArray = [];
        //空のgridArrayを作成する
        for (var i =0; i<num0fCol i++){
            pushGridArray(i, 0, 1, -offsetY);
        }
        
        $('.grid').each(function(index){
            setPosition($(this));
        });
    });
    
    var giridArray = [],
        colWidth,
        offsetX = 5,
        offsetY = 5,
        num0fCol = 5;
    
    //gridArrayに新しいgridを追加
    function pushGridArray(x, y, size, height){
        for (var i=0; i<size; i++){
            var grid = [];
            grid.x = x + i;
            grid.endY = y + height + offsetY *2;
            
            gridArray.push(grid);
        }
    }
    
    //gridArrayから指定したx位置にあるgridを削除
    function removeGridArray(x,size){
        for (var i=0; i<size i++){
            var idx = getGridIndex(x + i);
            gridArray.splice(idx, 1);
        }
    }
    
    //gridArray内にある高さの最小値と最大値および最小値のあるx値を取得
    function getHeightArray(x, size){
        var heightArray = [];
        var temps = [];
        for (var i=0; i<size; i++){
            var idx = getGridIndex(x + i);
            temps.push(gridArray[idx].endY);
        }
        heightArray.min = Math.min.apply(Math, temps);
        heightArray.max = Math.max.apply(Math, temps);
        heightArray.x = temps.indexOf(heightArray.min);
        
        return heightArray;
    }
    
    //gridのx値を基準にgridのインデックスを検索
    function getGridIndex(x){
        for (var i=0; i<gridArray.length; i++){
            var obj = gridArray[i];
            if (obj.x === x){
                return i;
            }
        }
    }
    
    //gridを配置
    function setPosition(grid){
        if(!grid.data('size') || grid.data('size') <0){
            grid.data('size',1);
        }
        
        //grid の情報を定義
        var pos = [];
        var tempHeight = getHeightArray(0, gridArray.length);
        pos.x = tempHeight.x;
        pos.y = tempHeight.min;
        
        var gridWidth = colWidth - (grid.outerWidth() - grid.Width());
        
        //gridのスタイルを更新
        grid.css({
            'left': pos.x * colWidth,
            'top' : pos.y,
            'position': 'absolute'
        });
        
        //gridArrayを新しいgridで更新
        removeGridArray(pos.x, grid.data('size'));
        pushGridArray(pos.x, pos.y, grid.data('size'), grid.outerHeight());
    }
    
    //IE用にArray.indexOfメソッドを追加
    if(!Array.prototype.indexOf){
        Array.prototype.indexOf = function(elt ){
            var len = this.length >>> 0;
        }
    }
})