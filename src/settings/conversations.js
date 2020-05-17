export const conversations = [
  {
    id: 'hello',
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'いらっしゃいませ！案内にしたがってお手続きください。'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご購入完了まで、私がお手伝いさせていただきます。'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: '入力はたった90秒で完了です！'
        }
      }
    ]
  },
  {
    id: 'userInfo-name',
    trigger: 'hello',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'お名前を教えて下さい。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormName'
        }
      }
    ]
  },
  {
    id: 'userInfo-address',
    trigger: 'userInfo-name',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: '次にご住所をお願いします。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormAddress'
        }
      }
    ]
  },
  {
    id: 'userInfo-email',
    trigger: 'userInfo-address',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'メールアドレスをお願いします。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormEmail'
        }
      }
    ]
  },
  {
    id: 'userInfo-tel',
    trigger: 'userInfo-email',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'お届けの事でご連絡する場合がありますので、繋がる電話番号をお願いします。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormTel'
        }
      }
    ]
  },
  {
    id: 'userInfo-mailmagazine',
    trigger: 'userInfo-tel',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'プライムダイレクトのお得情報などが届くメールマガジンに登録しますか？'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'newsletter',
            choices: { '01': '登録する', '02': '登録しない' }
          }
        }
      }
    ]
  },
  {
    id: 'payment-method',
    trigger: 'userInfo-mailmagazine',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'paymentMethods'
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'お支払い方法を選択してください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'settleTypeSelect',
            stored: true,
            storedName: 'paymentMethods'
          }
        }
      }
    ]
  },
  {
    id: 'payment-creditcard',
    trigger: 'payment-method',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCreditCard',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'クレジットカードの情報を入力して下さい。'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'カード情報の入力や送信は暗号化(SSL)処理されますので、安全にご利用いただけます。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCreditCard',
          props: {
            brands: ['visa', 'jcb', 'mastercard', 'amex', 'diners']
          }
        }
      }
    ]
  },
  {
    id: 'payment-creditcardCreateToken',
    trigger: 'payment-creditcard',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCreditCard',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'creditToken'
      }
    ]
  },
  {
    id: 'payment-paymentTime',
    trigger: 'payment-creditcardCreateToken',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCreditCard',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'paymentTimeChoices',
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'お支払い回数を選択してください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomSelect',
          props: {
            selects: [{
              name: 'paymentTime',
              title: '支払回数',
              stored: true,
              storedName: 'paymentTimeChoices'
            }]
          }
        }
      }
    ]
  },
  {
    id: 'confirm',
    trigger: 'payment-paymentTime',
    actions: [
      {
        human: false,
        type: 'function',
        function: 'confirmHTML'
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご購入内容の確認を行い、お間違いがなければ確定ボタンをタップしてください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormConfirmWithInnerHTML'
        }
      }
    ]
  },
  {
    id: 'cv-repare',
    trigger: 'confirm',
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご購入ありがとうございます。お手続きをしております。'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'conversionPrepare',
        whenReturn: {
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'shouldGoPaymentPage',
        whenReturn: {
          true: { id: 'conversion-not-cash' },
          false: { id: 'conversion-cash' }
        }
      },
    ]
  },
  {
    id: 'conversion-not-cash',
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: '自動的にお支払いページへ移動します。'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'conversion'
      },
    ]
  },
  {
    id: 'conversion-cash',
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご注文完了です。自動的にページを移動します。'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'conversion'
      },
    ]
  },
];