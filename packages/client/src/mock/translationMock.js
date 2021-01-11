import mockTransaction from '../../public/locales/en/translation.json';

const mockI18next = {
  on: (param, callBack) => {
    callBack();
  }
};
const mockReactI18next = {
  useTranslation: () => {
    return {
      t: (str) => {
        const splittedArray = str.split('.');
        const totalLevel = splittedArray.length;

        let currentLevel = 0;
        let currentNode = mockTransaction;
        while (currentLevel < totalLevel) {
          currentNode = currentNode[splittedArray[currentLevel]];
          currentLevel++;
        }
        return currentNode;
      },
      i18n: {
        changeLanguage: () => {}
      },
      ready: true
    };
  }
};
export { mockI18next, mockReactI18next };
