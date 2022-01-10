pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Test is ERC721Enumerable{
    uint public newTokenId;

    struct Point {
        int x;
        int z;
        uint y;
    }

    struct Branch {
        Point[] bendPoints;
        Point boughTouchPoint;
    }

    struct Bough {
        Point[] boughPoints;
    }

    struct Tree{
        Branch[] branches;
        Bough bough;
    }


    Tree[] public trees;

    enum woodColor {Brown, DarkBrown, Blue,Red,Pink,Dupa,Yellow,Black}
    enum leafColor {Red, Orange,Green, DarkGreen, Pink, Yellow,Black, UltraRainbow}

    constructor() ERC721("Tree", "Tre"){
        newTokenId = 0;
    }

    function mintTree() external {
//        newTokenId += 1;
//        Point memory point =   Point(1,1,1);
//        Point[] memory points;
//        points[0] = Point(1,1,1);
//
//        Branch memory  branch =   Branch(points, point) ;
//        Branch[] memory branches;
//        branches[0] = branch;
//
//        Bough memory bough =   Bough(points);
//
//        Tree memory tree =   Tree(branches, bough);
//        trees.push(tree);
//        _safeMint(msg.sender, newTokenId);
//        return newTokenId;
        _safeMint(msg.sender, newTokenId);
        newTokenId += 1;
        //return newTokenId;
    }


}