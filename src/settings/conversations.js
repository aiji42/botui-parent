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
          content: 'neltureのお得情報などが届くメールマガジンに登録しますか？'
        }
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormMailMagazine'
        }
      }
    ]
  },
  {
    id: 'deliveryPayment-couponHaving',
    trigger: 'userInfo-mailmagazine',
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
          content: 'FormCouponHaving'
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
          content: 'FormCoupon'
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
          content: 'クーポンコードがわからない場合は、さかのぼって「持っていない」を選択してください。'
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
          content: 'FormPayment'
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
        human: true,
        type: 'component',
        options: {
          content: 'FormCreditCard'
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
          content: 'FormPaymentTime'
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
          content: '会員登録を希望されますか？',
        },
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormMembership'
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
          content: 'パスワードを入力して下さい。',
        },
      },
      {
        human: true,
        type: 'component',
        options: {
          content: 'FormPassword'
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