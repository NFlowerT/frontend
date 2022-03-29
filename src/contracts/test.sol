pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract HelloWorld is ERC721,ERC721Enumerable{

    bytes32 PROVANANCE_HASH = 0x0;

    //id of the new token
    uint public newTokenId;

    address payable owner;

    mapping(uint => uint) public tokenIdToSaleId;
    mapping(uint => bool) public isOnSale;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner of the smart contract can call this function ;(((((");
        _;
    }

    modifier isTreeOwner(uint _treeId){
        require(ownerOf(_treeId) == msg.sender, "You are not owner of this tree");
        _;
    }

    modifier isSaleActive(uint _saleId){
        require(sales[_saleId].active, "Sale is not active");
        _;
    }

    modifier isUnderMax(){
        require(newTokenId<100,"Zmintowano juz wszystkie NFT dziekujemy :333");
        _;
    }

    struct Tree{
        string genes;
        uint256 birthdate;
    }

    struct Sale {
        address owner;
        bool active;
        uint TreeId;
        uint valueWei;
    }

    struct Request{
        address requesting;
        bool active;
    }

    mapping(address=>uint) public ownerToFunds;

    Request[] public requests;

    Tree[] public trees;

    Sale[] public sales;

    //Funkcja ktora pozwala adresowi ktory wywoluje ta funkcje przelac do siebie nalezne mu ETH
    function withdraw() external{
        uint toPay = ownerToFunds[msg.sender];
        ownerToFunds[msg.sender] = 0;
        payable(msg.sender).transfer(toPay);
    }

    //Osoba moze wystawic drzewko o danym Id po danej cenie jesli jest jego wlascicielem
    function putTreeOnSale(uint _treeId, uint _valueWei) external isTreeOwner(_treeId){
        Sale memory sale = Sale(msg.sender, true,_treeId,_valueWei);
        isOnSale[_treeId] =true;
        tokenIdToSaleId[_treeId] = sales.length;
        sales.push(sale);
    }

    //Mozesz kupic nft o danym Id po wystawionej cenie jesli jest na sprzedaz
    function buyTree(uint _saleId) external payable isSaleActive(_saleId){
        require(sales[_saleId].owner == ownerOf(sales[_saleId].TreeId), "Person who put that tree on sale is not this tree owner anymore");
        require(sales[_saleId].valueWei <= msg.value, "not enough funds");
        ownerToFunds[sales[_saleId].owner] += msg.value;
        isOnSale[sales[_saleId].TreeId] = false;
        sales[_saleId].active = false;
        _transfer(sales[_saleId].owner,msg.sender , sales[_saleId].TreeId);
    }

    //jesli jednak nie chcesz sprzedac swojego drzewka mozesz "zdjac je z "marketu"
    function endSale(uint _saleId) external isSaleActive(_saleId) {
        require(sales[_saleId].owner == msg.sender, "you are not owner of this sale");
        sales[_saleId].active = false;
        isOnSale[sales[_saleId].TreeId] = false;
    }
    //Uzytkownik prosi o utworzenie Nft dla niego i my je potem mintujemy
    function requestTree() external payable isUnderMax(){
        require(msg.value == 1 ether);
        ownerToFunds[owner] += msg.value;
        Request memory request = Request(msg.sender,true);
        requests.push(request);
    }

    constructor() ERC721("Tree", "Tre"){
        owner = payable(msg.sender);
        newTokenId = 0;
    }
    //owner smart contractu tworzy nft i wpisuje geny drzewka ktore ma byc dla uzytkownika ktory ostatni zrequestowal(nwm no pozniej lepiej napisze te komentarze)
    function mintTree(string memory _genes) external onlyOwner() isUnderMax(){
        _safeMint(requests[newTokenId].requesting, newTokenId);
        Tree memory tree = Tree(_genes,block.timestamp);
        trees[newTokenId] = tree;
        newTokenId += 1;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
    internal
    override(ERC721, ERC721Enumerable)
    {
        if(isOnSale[tokenId]){
            isOnSale[tokenId] = false;
            sales[tokenIdToSaleId[tokenId]].active = false;
        }
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
    public
    view
    override(ERC721, ERC721Enumerable)
    returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}