export interface BaseRequest {
    per_page?: number;
    page?: number;
    search?: string;
    sort_by?: string;
    sort_dir?: string;
}

export interface BaseResponse<T> {
    rc: string;
    message: string;
    timestamp: string;
    payload: {
        data: T;
        [key: string]: any;
    };

    [key: string]: any;
    
}
