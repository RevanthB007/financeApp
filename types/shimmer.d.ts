declare module 'shimmer' {
    function wrap<T extends Function>(
      nodule: object,
      name: string,
      wrapper: (original: T) => T
    ): void;
    
    function massWrap<T extends Function>(
      nodules: object[],
      names: string[],
      wrapper: (original: T) => T
    ): void;
    
    function unwrap(nodule: object, name: string): void;
    
    function massUnwrap(nodules: object[], names: string[]): void;
    
    export = {
      wrap,
      massWrap,
      unwrap,
      massUnwrap
    };
  }