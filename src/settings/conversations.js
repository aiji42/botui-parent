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
    id: 'delivery-method',
    trigger: 'userInfo-mailmagazine',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectableDeliveryMethod',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'deliveryMethodChoices'
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご希望のお届け方法を選択してください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'deliveryServiceSelect',
            stored: true,
            storedName: 'deliveryMethodChoices'
          }
        }
      }
    ]
  },
  {
    id: 'delivery-dateTime',
    trigger: 'delivery-method',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectableDeliveryDateTime',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'deliveryDateChoices'
      },
      {
        human: false,
        type: 'function',
        function: 'deliveryTimeChoices'
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'お届け日時の希望を選択してください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomSelect',
          props: {
            selects: [
              {
                name: 'deliveryHopeDate',
                title: 'お届け希望日',
                stored: true,
                storedName: 'deliveryDateChoices'
              },
              {
                name: 'deliveryHopeTime',
                title: 'お届け希望時間帯',
                stored: true,
                storedName: 'deliveryTimeChoices'
              }
            ]
          }
        }
      }
    ]
  },
  {
    id: 'payment-method',
    trigger: 'delivery-dateTime',
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
    id: 'others-comunicate',
    trigger: 'payment-paymentTime',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'お伝え事項があればご記入ください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomTextarea',
          props: {
            name: 'comunicate',
            title: '備考',
            placeholder: 'のし袋希望など'
          }
        }
      }
    ]
  },
  {
    id: 'confirm',
    trigger: 'others-comunicateuej',
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
    id: 'conversion',
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
        function: 'conversion',
        whenReturn: {
          true: 'skip'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          dataStoreAnnounce: 'conversion'
        }
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  }
];