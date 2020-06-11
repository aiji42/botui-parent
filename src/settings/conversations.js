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
    id: 'userInfo-birthday',
    trigger: 'userInfo-tel',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: '生年月日をご入力ください。'
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
          content: 'お得な情報をメールマガジンで受け取りますか？'
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
    id: 'userInfo-password',
    trigger: 'userInfo-mailmagazine',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isInputablePassword',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'ご希望のパスワードを入力して下さい。',
        },
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomInput',
          props: {
            inputs: [{
              name: 'password',
              type: 'password',
              title: 'パスワード',
              secure: true,
              validation: {
                type: 'string',
                required: ['入力してください'],
                matches: [/^[a-z\d`\-=~!@#$%^&*()_+[\]{}|;':,./<>?]+$/i, '使用できない文字が含まれています(半角英数字と記号で入力してください)'],
                min: [6, '6文字以上の半角英数字で入力してください'],
                max: [30, '30文字以内の半角英数字で入力してください']
              }
            }]
          }
        }
      }
    ]
  },
  {
    id: 'userInfo-privacyAgree',
    trigger: 'userInfo-password',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isInputablePrivacyAgree',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: '上記の内容で会員登録をさせていただきます。(ご購入のお手続きはまだ完了していません)',
        },
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'パスワードはご購入手続きが完了するまで変更することができませんので、ご注意ください。',
        },
      },
      {
        human: false,
        type: 'message',
        options: {
          content: '<a href="https://www.primedirect.jp/policy/" target="_blank">個人情報のお取扱い</a>をご確認のうえ、お進みください。',
        },
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'privacyAgree',
            choices: { 'on': '個人情報保護方針に同意の上、会員登録する' }
          }
        }
      }
    ]
  },
  {
    id: 'stepForward-settleEdit',
    trigger: 'userInfo-privacyAgree',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'goToSettleEditStep',
        whenReturn: {
          true: 'skip'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          dataStoreAnnounce: 'goToSettleEditStep'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: '上の入力欄に戻って入力変更してください。',
        },
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  },
  {
    id: 'delivery-method',
    trigger: 'stepForward-settleEdit',
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
          content: 'FormCreditCard'
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
        function: 'paymentTimeChoices',
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
    id: 'others-pointUseage',
    trigger: 'payment-paymentTime',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isUseablePoints',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'pointUseageChoices',
      },
      {
        human: false,
        type: 'function',
        function: 'pointAnnounce',
      },
      {
        human: false,
        type: 'message',
        options: {
          dataStoreAnnounce: 'pointAnnounce'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'pointSelect',
            stored: true,
            storedName: 'pointUseageChoices'
          }
        }
      }
    ]
  },
  {
    id: 'others-pointInput',
    trigger: 'others-pointUseage',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isUseablePoints',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'isInputablePoints',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomInput',
          props: {
            inputs: [{
              name: 'usePoint',
              type: 'tel',
              title: '使用するポイント数',
              validation: {
                type: 'number',
                required: ['入力してください'],
                integer: ['整数の数字で入力してください'],
                min: [0, '1ポイント以上を指定してください']
              }
            }]
          }
        }
      }
    ]
  },
  {
    id: 'others-pointValidate',
    trigger: 'others-pointInput',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isUseablePoints',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'isInputablePoints',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'pointUseableValidate',
        whenReturn: {
          true: 'skip',
          false: 'continue'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: '使用できるポイント数を確認してください。'
        }
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  },
  {
    id: 'others-communication',
    trigger: 'others-pointValidate',
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
            name: 'communication',
            title: '備考',
            placeholder: '例) のし紙をつけてください。'
          }
        }
      }
    ]
  },
  {
    id: 'stepForward-confirm',
    trigger: 'others-communication',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'goToConfirmStep'
      }
    ]
  },
  {
    id: 'confirm',
    trigger: 'stepForward-confirm',
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
        human: false,
        type: 'message',
        options: {
          content: '入力内容修正の場合は、先程の入力した項目までさかのぼってご修正ください'
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