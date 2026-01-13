#include <iostream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

struct Node {
  string val;
  Node* left = nullptr;
  Node* right = nullptr;
  explicit Node(string v) : val(std::move(v)) {}
};

static void traverse(Node* root, const string& order, vector<string>& out) {
  if (!root) return;
  if (order == "pre") out.push_back(root->val);
  traverse(root->left, order, out);
  if (order == "in") out.push_back(root->val);
  traverse(root->right, order, out);
  if (order == "post") out.push_back(root->val);
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);

  string order;
  if (!(cin >> order)) return 0;
  if (order != "pre" && order != "in" && order != "post") {
    // Keep output empty for invalid input (OJ-friendly).
    return 0;
  }

  vector<string> lvl;
  for (string tok; cin >> tok;) lvl.push_back(tok);
  if (lvl.empty() || lvl[0] == "#") return 0;

  vector<Node*> nodes(lvl.size(), nullptr);
  for (size_t i = 0; i < lvl.size(); i++) {
    if (lvl[i] != "#") nodes[i] = new Node(lvl[i]);
  }
  for (size_t i = 0; i < lvl.size(); i++) {
    if (!nodes[i]) continue;
    size_t li = i * 2 + 1, ri = i * 2 + 2;
    if (li < lvl.size()) nodes[i]->left = nodes[li];
    if (ri < lvl.size()) nodes[i]->right = nodes[ri];
  }

  vector<string> out;
  traverse(nodes[0], order, out);
  for (size_t i = 0; i < out.size(); i++) {
    if (i) cout << ' ';
    cout << out[i];
  }
  if (!out.empty()) cout << "\n";

  // cleanup
  for (Node* p : nodes) delete p;
  return 0;
}

