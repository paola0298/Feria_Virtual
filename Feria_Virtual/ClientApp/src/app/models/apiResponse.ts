export class ApiResponse<T> {

    value: T;
    responseCode: number;
    responseText: string;

    constructor(value: T, responseCode: number, responseText: string) {
        this.value = value;
        this.responseCode = responseCode;
        this.responseText = responseText;
    }

    succeeded() {
        return this.responseCode >= 200 && this.responseCode < 300;
    }

}

