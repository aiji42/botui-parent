import image from '../../public/60s_blue.jpg'

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
      }
    ]
  },
  {
    id: 'promotion60s',
    trigger: 'hello',
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: `<img src="${image}" width="100%" />`
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: '通常のフォームでお手続きを行う場合には、右上のバツ印をクリックしてください。'
        }
      }
    ]
  },
  {
    id: 'userInfo-gender',
    trigger: 'promotion60s',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'まずはあなたの性別を選択してください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'gender',
            choices: {
              '1': '男性', '2': '女性'
            }
          }
        }
      }
    ]
  },
  {
    id: 'userInfo-name',
    trigger: 'userInfo-gender',
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
    id: 'userInfo-birthday',
    trigger: 'userInfo-tel',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: '生年月日を教えてください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormBirthDay'
        }
      }
    ]
  },
  {
    id: 'userInfo-mailmagazine',
    trigger: 'userInfo-birthday',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'neltureのお得情報などが届くメールマガジンに登録しますか？'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'mailmagazine',
            choices: { 'true': '登録する', 'false': '登録しない' }
          }
        }
      }
    ]
  },
  {
    id: 'deliveryPayment-delivery',
    trigger: 'userInfo-mailmagazine',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectableDeriveryDateTime',
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
                name: 'deliveryDate',
                title: 'お届け希望日',
                stored: true,
                storedName: 'deliveryDateChoices'
              },
              {
                name: 'deliveryTime',
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
    id: 'deliveryPayment-payment',
    trigger: 'deliveryPayment-delivery',
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
            name: 'payment',
            stored: true,
            storedName: 'paymentMethods'
          }
        }
      }
    ]
  },
  {
    id: 'confirm',
    trigger: 'deliveryPayment-payment',
    actions: [
      {
        human: false,
        type: 'function',
        function: 'confirm'
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご購入内容の確認を行い、お間違いがなければボタンをタップしてください。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormConfirm'
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