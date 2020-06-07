import image from '../../public/90s_blue.png'

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
          content: `<img src="${image}" width="100%" />`
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
          content: 'お得情報などが届くメールマガジンに登録しますか？'
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
    id: 'userInfo-checout',
    trigger: 'userInfo-mailmagazine',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'checkoutUserInfo',
        whenReturn: {
          true: 'skip',
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          dataStoreAnnounce: 'checkoutUserInfo'
        }
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  },
  {
    id: 'deliveryPayment-couponHaving',
    trigger: 'userInfo-checout',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'クーポンコードをお持ちですか？'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'couponHaving',
            choices: { 'true': '持っている', 'false': '持っていない' }
          }
        }
      }
    ]
  },
  {
    id: 'deliveryPayment-couponCode',
    trigger: 'deliveryPayment-couponHaving',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isCouponHaving',
        whenReturn: {
          true: 'continue',
          false: 'skip'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'クーポンコードを入力して下さい。'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomInput',
          props: {
            inputs: [{
              name: 'coupon',
              type: 'text',
              title: 'クーポン',
              placeholder: 'クーポン番号',
              validation: {
                type: 'string',
                required: ['入力してください'],
                max: [200, '入力内容が長すぎます']
              }
            }]
          }
        }
      }
    ]
  },
  {
    id: 'deliveryPayment-checkoutCoupon',
    trigger: 'deliveryPayment-couponCode',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'checkoutAndValidateCoupon',
        whenReturn: {
          true: 'skip',
          false: 'continue'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'クーポンコードが間違っているようです。確認して再入力して下さい。'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'クーポンコードをお持ちでない場合は、さかのぼって「持っていない」を選択してください。'
        }
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  },
  {
    id: 'deliveryPayment-payment',
    trigger: 'deliveryPayment-checkoutCoupon',
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
    id: 'deliveryPayment-checkoutPaymentMethod',
    trigger: 'deliveryPayment-payment',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'checkoutPaymentMethod'
      }
    ]
  },
  {
    id: 'deliveryPayment-creditCard',
    trigger: 'deliveryPayment-checkoutPaymentMethod',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCredit',
        whenReturn: {
          false: 'skip',
          true: 'continue'
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
    id: 'deliveryPayment-checkoutCard',
    trigger: 'deliveryPayment-creditCard',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCredit',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'checkoutCard',
      }
    ]
  },
  {
    id: 'deliveryPayment-paymentTime',
    trigger: 'deliveryPayment-checkoutCard',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCredit',
        whenReturn: {
          false: 'skip',
          true: 'continue'
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
    id: 'deliveryPayment-checkoutPaymentTime',
    trigger: 'deliveryPayment-paymentTime',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isSelectedCredit',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'checkoutPaymentTime',
      }
    ]
  },
  {
    id: 'membership-registerOpt',
    trigger: 'deliveryPayment-checkoutPaymentTime',
    countable: true,
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: '会員登録を希望されますか？会員登録していただくと、次回以降ポイント・クーポンがご利用いただけます。',
        },
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormCustomRadioGroup',
          props: {
            name: 'membership',
            choices: { 'true': '登録する', 'false': '登録しない' }
          }
        }
      }
    ]
  },
  {
    id: 'membership-password',
    trigger: 'membership-registerOpt',
    countable: true,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isMembershipOptIn',
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
              validation: {
                type: 'string',
                required: ['入力してください'],
                matches: [/^[a-z\d!#$%&'()*+,./:;<=>?@\-[\]^_`{|}~]+$/i, '使用できない文字が含まれています(半角英数字と記号で入力してください)'],
                min: [6, '6文字以上で入力してください'],
                max: [30, '30文字以内で入力してください']
              }
            }]
          }
        }
      }
    ]
  },
  {
    id: 'confirm',
    trigger: 'membership-password',
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
          content: 'ご購入内容の確認を行い、お間違いがなければボタンをタップしてください。'
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
    id: 'membership-register',
    trigger: 'confirm',
    countable: false,
    actions: [
      {
        human: false,
        type: 'function',
        function: 'isMembershipOptIn',
        whenReturn: {
          false: 'skip',
          true: 'continue'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'membershipRegister',
        whenReturn: {
          true: 'skip',
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          dataStoreAnnounce: 'membershipRegister'
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'さかのぼって入力内容を変更するか、会員のお客様はログインページからご購入ください。'
        }
      },
      {
        human: true,
        type: 'message',
        options: {
          content: '<a href="https://www.amepla.jp/p/login" target="_top">ログインページはこちら</a>'
        }
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  },
  {
    id: 'conversion',
    trigger: 'membership-register',
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
          true: 'skip',
        }
      },
      {
        human: false,
        type: 'message',
        options: {
          content: 'お手続きのため、自動的にページを遷移させていただきます。'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'redirectToConversion'
      },
      {
        human: false,
        type: 'stop'
      }
    ]
  },
  {
    id: 'goToThanksPage',
    trigger: 'conversion',
    actions: [
      {
        human: false,
        type: 'message',
        options: {
          content: 'お手続きが完了しました。サンクスページに移動します。'
        }
      },
      {
        human: false,
        type: 'function',
        function: 'goToThanks'
      },
    ]
  }
];
