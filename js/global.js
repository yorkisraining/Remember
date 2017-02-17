$(function() {
	var matching = {};
	matching.num = [
		'aa', 'aa',
		'ab', 'ab',
		'ac', 'ac',
		'ad', 'ad',
		'ae', 'ae',
		'af', 'af',
		'ag', 'ag',
		'ah', 'ah',
		'ai', 'ai',
		'aj', 'aj',
		'ak', 'ak',
		'al', 'al',
		'am', 'am',
		'an', 'an'
	]
	
	
	matching.num.sort(shuffle);
	//copy 12 cards
	for (var i=0; i<27; i++) {
		
		$('.acard:first-child').clone().appendTo('.card-wrap');
		
	}
	
	$('.card-wrap').children().each(function(index) {
		//4*3 
		$(this).css({
			'left' : ($(this).width() + 20) * (index % 7),
			'top' : ($(this).height() + 30) * Math.floor(index/7)
		});
		//从已经洗过的牌中获取图案
		var pattern = matching.num.pop();
		//应用纸牌背面图案
		$(this).find('.back').addClass(pattern);
		//数据放入DOM
		$(this).attr('data-pattern', pattern);
		//监听点击事件
		$(this).click(selectCard);
	});

});

function shuffle() {
	return 0.5 - Math.random();
}

function selectCard() {
	//如果已经翻开两张牌
	console.log($('.card-flipped').length)
	if ( $('.card-flipped').length > 1) {
		return;
	} else {
		$(this).addClass('card-flipped');
	}
	//0.7s后检测
	if ($('.card-flipped').length == 2) {
		setTimeout(checkPattern, 700);
	}
	
}

function checkPattern() {
	if (isMatchPattern()) {
		$('.card-flipped').removeClass('card-flipped').addClass('card-removed');
		$('card-removed').bind('webkitTransitionEnd', removeTookCards);
	} else {
		$('.card-flipped').removeClass('card-flipped');
	}
}

function isMatchPattern() {
	var cards = $('.card-flipped');
	var pattern = $(cards[0]).data('pattern');
	var anotherPattern = $(cards[1]).data('pattern');
	return(pattern == anotherPattern);
}

function removeTookCards() {
	$('.card-removed').remove();
}
