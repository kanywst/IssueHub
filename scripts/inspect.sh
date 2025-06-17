#!/bin/bash

# 全てのコード検査、テスト、セキュリティチェックを実行するスクリプト
echo "🔍 IssueHub コード検査スクリプト 🔍"
echo "========================================"
echo ""

# コードフォーマットの適用
echo "📝 コードフォーマットを適用中..."
yarn format
echo "✅ コードフォーマット完了"
echo ""

# リント実行
echo "🧹 コードリントを実行中..."
yarn lint
if [ $? -ne 0 ]; then
  echo "❌ リントでエラーが見つかりました"
  exit 1
else
  echo "✅ リント完了"
fi
echo ""

# 依存関係チェック
echo "📦 依存関係をチェック中..."
yarn deps:check
echo "✅ 依存関係チェック完了"
echo ""

# セキュリティスキャン
echo "🔒 セキュリティスキャンを実行中..."
yarn security:scan
if [ $? -ne 0 ]; then
  echo "⚠️ セキュリティの問題が見つかりました"
else
  echo "✅ セキュリティスキャン完了"
fi
echo ""

# E2Eテスト
echo "🧪 E2Eテストを実行中..."
yarn test:e2e:ci
if [ $? -ne 0 ]; then
  echo "❌ テストに失敗しました"
  exit 1
else
  echo "✅ テスト完了"
fi
echo ""

echo "🎉 全ての検査が完了しました"
echo "========================================"
