import http from "../http-common";

class blogService {
  getPost(id) {
    return http.get(`/posts/${id}`);
  }

  createComment(id,data) {
    console.log(data)
    return http.post(`/posts/${id}/comment`, data);
  }

}
export default new blogService();
