import Map "mo:base/HashMap";
import Text "mo:base/Text";
import List "mo:base/List";


actor {

  stable var list:List.List<Text> = List.nil<Text>();

    public func isAlreadySearch(data: Text): async Bool {
    var exists = false;
    for (txt in List.toIter<Text>(list)) {
      if (txt == data) {
        exists := true;
      }
    };
    return exists;
  };

  public func put(data : Text) : async Text {
    list:= List.push(data,list);
    return data;
  };

  public func fetchList() : async List.List<Text>{
    return list;
  };

  public func deleteHistory() : async List.List<Text> {
    list:= List.nil<Text>();
    return list;
  };
};
