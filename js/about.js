// JavaScript Document
// JS bestand voor About pagina

$(function() {
	//alert(
	//	$('a')	.addClass('rood')
	//		.filter('a[target]').addClass('groen')
	//		.end().addClass('onderlijnd').length
	//);

	$('tbody tr:odd').addClass('oneven');
	$('tbody tr:even').addClass('even');

	$('a[href^="http"]').on('click', function() {
		alert('U staat op het punt de pagina te verlaten')
	});

	$('<a href="#about" title="terug naar boven"> Terug naar boven </a>').insertBefore(':header:gt(1)')
		.button({icons:{secondary:'ui-icon-circle-triangle-n'}});

});

var lijst	=	['roger', 'evelyn', 'hilde', 'jan'];

var walkTree = function (root, $list, enter, exit) 
{
  var node = root;
  start: while (node) {
	 
	$list = enter(node,$list);
	if (node.firstChild) {
	  node = node.firstChild;
	  continue start;
	}
	while (node) {
	  $list = exit(node,$list);
	  if (node.nextSibling) {
		node = node.nextSibling;
		continue start;
	  }
	  if (node == root)
		node = null;
	  else
		node = node.parentNode;
	}
  }
  return $list;
}
