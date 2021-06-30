// Generated by ReScript, PLEASE EDIT WITH CARE


function oppositeColor(color) {
  if (color) {
    return /* White */0;
  } else {
    return /* Black */1;
  }
}

function colorName(color) {
  if (color) {
    return "Black";
  } else {
    return "White";
  }
}

function getAsset(piece) {
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        var color = piece._0.color;
        return "assets/" + (
                color ? "Black" : "White"
              ) + "/pawn";
    case /* King */1 :
        var color$1 = piece._0.color;
        return "assets/" + (
                color$1 ? "Black" : "White"
              ) + "/king";
    case /* Queen */2 :
        var color$2 = piece._0.color;
        return "assets/" + (
                color$2 ? "Black" : "White"
              ) + "/queen";
    case /* Bishop */3 :
        var color$3 = piece._0.color;
        return "assets/" + (
                color$3 ? "Black" : "White"
              ) + "/bishop";
    case /* Knight */4 :
        var color$4 = piece._0.color;
        return "assets/" + (
                color$4 ? "Black" : "White"
              ) + "/knight";
    case /* Rook */5 :
        var color$5 = piece._0.color;
        return "assets/" + (
                color$5 ? "Black" : "White"
              ) + "/rook";
    
  }
}

function getColor(piece) {
  return piece._0.color;
}

function getEmphasis(piece) {
  return piece._0.emphasizeCoverRange;
}

function getX(piece) {
  return piece._0.x;
}

function getY(piece) {
  return piece._0.y;
}

function withMoved(piece) {
  var withMovedHelper = function (p, y) {
    if (p.hasMoved) {
      return piece;
    } else {
      return y;
    }
  };
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        var p = piece._0;
        return withMovedHelper(p, {
                    TAG: /* Pawn */0,
                    _0: {
                      x: p.x,
                      y: p.y,
                      color: p.color,
                      hasMoved: true,
                      emphasizeCoverRange: p.emphasizeCoverRange,
                      hasJustMoved2Spaces: p.hasJustMoved2Spaces
                    }
                  });
    case /* King */1 :
        var k = piece._0;
        return withMovedHelper(k, {
                    TAG: /* King */1,
                    _0: {
                      x: k.x,
                      y: k.y,
                      color: k.color,
                      hasMoved: true,
                      emphasizeCoverRange: k.emphasizeCoverRange,
                      inCheck: k.inCheck,
                      checkmated: k.checkmated
                    }
                  });
    case /* Queen */2 :
        var p$1 = piece._0;
        return withMovedHelper(p$1, {
                    TAG: /* Queen */2,
                    _0: {
                      x: p$1.x,
                      y: p$1.y,
                      color: p$1.color,
                      hasMoved: true,
                      emphasizeCoverRange: p$1.emphasizeCoverRange
                    }
                  });
    case /* Bishop */3 :
        var p$2 = piece._0;
        return withMovedHelper(p$2, {
                    TAG: /* Bishop */3,
                    _0: {
                      x: p$2.x,
                      y: p$2.y,
                      color: p$2.color,
                      hasMoved: true,
                      emphasizeCoverRange: p$2.emphasizeCoverRange
                    }
                  });
    case /* Knight */4 :
        var p$3 = piece._0;
        return withMovedHelper(p$3, {
                    TAG: /* Knight */4,
                    _0: {
                      x: p$3.x,
                      y: p$3.y,
                      color: p$3.color,
                      hasMoved: true,
                      emphasizeCoverRange: p$3.emphasizeCoverRange
                    }
                  });
    case /* Rook */5 :
        var p$4 = piece._0;
        return withMovedHelper(p$4, {
                    TAG: /* Rook */5,
                    _0: {
                      x: p$4.x,
                      y: p$4.y,
                      color: p$4.color,
                      hasMoved: true,
                      emphasizeCoverRange: p$4.emphasizeCoverRange
                    }
                  });
    
  }
}

function with2Spaces(p) {
  return {
          TAG: /* Pawn */0,
          _0: {
            x: p.x,
            y: p.y,
            color: p.color,
            hasMoved: true,
            emphasizeCoverRange: p.emphasizeCoverRange,
            hasJustMoved2Spaces: true
          }
        };
}

function withPosition(piece, param) {
  var y = param[1];
  var x = param[0];
  switch (piece.TAG | 0) {
    case /* Pawn */0 :
        var p = piece._0;
        return {
                TAG: /* Pawn */0,
                _0: {
                  x: x,
                  y: y,
                  color: p.color,
                  hasMoved: p.hasMoved,
                  emphasizeCoverRange: p.emphasizeCoverRange,
                  hasJustMoved2Spaces: p.hasJustMoved2Spaces
                }
              };
    case /* King */1 :
        var k = piece._0;
        return {
                TAG: /* King */1,
                _0: {
                  x: x,
                  y: y,
                  color: k.color,
                  hasMoved: k.hasMoved,
                  emphasizeCoverRange: k.emphasizeCoverRange,
                  inCheck: k.inCheck,
                  checkmated: k.checkmated
                }
              };
    case /* Queen */2 :
        var p$1 = piece._0;
        return {
                TAG: /* Queen */2,
                _0: {
                  x: x,
                  y: y,
                  color: p$1.color,
                  hasMoved: p$1.hasMoved,
                  emphasizeCoverRange: p$1.emphasizeCoverRange
                }
              };
    case /* Bishop */3 :
        var p$2 = piece._0;
        return {
                TAG: /* Bishop */3,
                _0: {
                  x: x,
                  y: y,
                  color: p$2.color,
                  hasMoved: p$2.hasMoved,
                  emphasizeCoverRange: p$2.emphasizeCoverRange
                }
              };
    case /* Knight */4 :
        var p$3 = piece._0;
        return {
                TAG: /* Knight */4,
                _0: {
                  x: x,
                  y: y,
                  color: p$3.color,
                  hasMoved: p$3.hasMoved,
                  emphasizeCoverRange: p$3.emphasizeCoverRange
                }
              };
    case /* Rook */5 :
        var p$4 = piece._0;
        return {
                TAG: /* Rook */5,
                _0: {
                  x: x,
                  y: y,
                  color: p$4.color,
                  hasMoved: p$4.hasMoved,
                  emphasizeCoverRange: p$4.emphasizeCoverRange
                }
              };
    
  }
}

function isPromotionEligible(piece) {
  if (piece.color === /* White */0 && piece.y === 7) {
    return true;
  } else if (piece.color === /* Black */1) {
    return piece.y === 0;
  } else {
    return false;
  }
}

function pawnOffsetHelper(p, n) {
  var match = p.color;
  if (match) {
    return -n | 0;
  } else {
    return n;
  }
}

var scalingFactor = 4;

var assetSize = 23;

export {
  scalingFactor ,
  assetSize ,
  oppositeColor ,
  colorName ,
  getAsset ,
  getColor ,
  getEmphasis ,
  getX ,
  getY ,
  withMoved ,
  with2Spaces ,
  withPosition ,
  isPromotionEligible ,
  pawnOffsetHelper ,
  
}
/* No side effect */